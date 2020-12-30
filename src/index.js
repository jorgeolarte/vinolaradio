import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigations/MainStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as screens from "./screens";

const RootStack = createDrawerNavigator();

const MyApp = () => {
  return (
    <>
      <StatusBar
        style='auto'
        backgroundColor='#343a40'
        barStyle='light-content'
      />
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
    </>
  );
};

export default MyApp;
