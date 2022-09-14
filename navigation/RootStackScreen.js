import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/loginScreen";
import MainScreen from "./MainScreen";
import RegisterScreen from "./screens/RegisterScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator>
      {/* <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      /> */}
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
