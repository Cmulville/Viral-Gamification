import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/loginScreen";
import MainScreen from "./MainScreen";
import RegisterScreen from "./screens/RegisterScreen";

const RootStack = createStackNavigator();
const status = "Immune";
const points = 0;
const statusColours = {
  Cured: "#05cf02",
  Infected: "#f52718",
  Immune: "#0aefff",
};
const screenColors = statusColours[status];

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator headerMode="false">
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="MainScreen" component={MainScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
