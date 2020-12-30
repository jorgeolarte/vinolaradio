import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ButtonMenu from "./components/ButtonMenu";
import Logo from "./components/Logo";
import * as screens from "./screens";

const MainStack = createStackNavigator();
const RootStack = createDrawerNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name='Home'
        component={screens.homeScreen}
        options={({ navigation }) => ({
          initialRouteName: "Home",
          headerTitle: () => <Logo />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#343a40",
          },
          headerTintColor: "#eee",
          headerRight: () => <ButtonMenu navigation={navigation} />,
        })}
      />
    </MainStack.Navigator>
  );
};

const RootStackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        drawerContent={(props) => (
          <screens.optionsScreen props={{ ...props }} />
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
        <RootStack.Screen name='Inicio' component={MainStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigator;
