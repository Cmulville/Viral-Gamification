import React from "react";
import { Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer"
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "./screens/loginScreen";
import MainScreen from "./MainScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tabContext } from "../tabContext";
import { color } from "react-native-reanimated";
import Icon from 'react-native-ionicons'

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const RootStackScreen = ({ navigation }) => {
  const { status } = React.useContext(tabContext)
  const { points } = React.useContext(tabContext)
  const { screenColors } = React.useContext(tabContext)
  
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
        options={{
          title: status + " | Points: " + points,
          //headerLeft: () => null,
          headerLeft: () => 
          <Text
              style={styles.container}
              onPress={() => navigation.navigate("Settings")}
              color="#fff"
            ><Ionicons name="menu-outline" size={40} color="white" /></Text>,
          headerStyle: {
            backgroundColor: screenColors
          }
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
