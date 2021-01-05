import React, { useRef } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigations/MainStack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as Analytics from "expo-firebase-analytics";
import * as screens from "./screens";

const RootStack = createDrawerNavigator();

const MyApp = () => {
  const routeNameRef = useRef();
  const navigationRef = useRef();

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
