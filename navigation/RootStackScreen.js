import React from "react";
import { Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNav from "./drawerScreen";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const RootStackScreen = ({ navigation }) => {
  const RootStack = createStackNavigator();

  /** The main navigation system before logging in where we have the login page,
   * register page and then finally the  main game
   * */
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name={"Drawer"}
        component={DrawerNav}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          gestureEnabled: false,
        }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
