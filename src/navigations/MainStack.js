import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Logo from "../components/Logo";
import ButtonMenu from "../components/ButtonMenu";
import * as screens from "../screens";

const MainStack = createStackNavigator();

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

export default MainStackNavigator;
