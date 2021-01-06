import React, { useRef, useEffect } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import {
  checkInternetConnection,
  offlineActionCreators,
} from "react-native-offline";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigations/MainStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as screens from "./screens";
import * as Analytics from "expo-firebase-analytics";

const RootStack = createDrawerNavigator();
const { connectionChange } = offlineActionCreators;

const MyApp = ({ network, connectionChange, signOut }) => {
  const routeNameRef = useRef();
  const navigationRef = useRef();

  useEffect(() => {
    const internetChecker = async () => {
      const isConnected = await checkInternetConnection();
      // Dispatching can be done inside a connected component, a thunk (where dispatch is injected), saga, or any sort of middleware
      console.log("isConnected: ", isConnected);
      // In this example we are using a thunk
      connectionChange(isConnected);
    };

    return () => internetChecker();
  }, []);

  return (
    <>
      <StatusBar
        style='auto'
        backgroundColor='#343a40'
        barStyle='light-content'
      />
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            Analytics.setCurrentScreen(currentRouteName);
          }
          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName;
        }}
      >
        <RootStack.Navigator
          drawerContent={(props) => (
            <screens.OptionsScreen props={{ ...props }} />
          )}
          initialRouteName='Main'
          drawerPosition='right'
          drawerContentOptions={{
            backgroundColor: "#343a40",
            activeBackgroundColor: "transparent",
            inactiveBackgroundColor: "red",
            labelStyle: {
              color: "white",
              fontSize: 24,
            },
          }}
        >
          {!network.isConnected ? (
            <RootStack.Screen
              name='Offline'
              component={screens.OfflineScreen}
            />
          ) : (
            <RootStack.Screen name='Inicio' component={MainStackNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    network: state.network,
  };
};

const mapDispatchToProps = (dispatch) => ({
  connectionChange: (isConnected) => dispatch(connectionChange(isConnected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);
