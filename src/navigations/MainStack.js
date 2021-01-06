import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import Logo from "../components/Logo";
import ButtonMenu from "../components/ButtonMenu";
import * as screens from "../screens";
import { firebase } from "../utils/Firebase";
import { signOut } from "../reducers/user";
import * as Analytics from "expo-firebase-analytics";

const MainStack = createStackNavigator();

const MainStackNavigator = ({ user, signOut }) => {
  useEffect(() => {
    const subscriber = () => {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser === null) {
          signOut();
          Analytics.resetAnalyticsData();
        } else {
          Analytics.setUserId(currentUser.uid);
        }
      });
    };

    return subscriber();
  }, []);

  return (
    <MainStack.Navigator
      screenOptions={({ navigation }) => ({
        initialRouteName: "Home",
        headerTitle: () => <Logo />,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#343a40",
        },
        headerTintColor: "#eee",
        headerRight: () => <ButtonMenu navigation={navigation} />,
      })}
    >
      {user.userUid === null ? (
        <MainStack.Screen
          name='SignIn'
          component={screens.SigInScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <MainStack.Screen name='Home' component={screens.HomeScreen} />
      )}
    </MainStack.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainStackNavigator);
