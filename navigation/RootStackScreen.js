import React from "react";
import { Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { DrawerActions, useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";

import DrawerNav from "./drawerScreen";
import LoginScreen from "./screens/loginScreen";
import MainScreen from "./MainScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tabContext } from "../tabContext";
import { color } from "react-native-reanimated";
import Icon from 'react-native-ionicons'


const RootStackScreen = ({ navigationx }) => {
  const { status } = React.useContext(tabContext)
  const { points } = React.useContext(tabContext)
  const { screenColors } = React.useContext(tabContext)
  const RootStack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  
  return (

    <RootStack.Navigator>
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}

      />
              
        <RootStack.Screen name={"Drawer"} component={DrawerNav}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            gestureEnabled: false
          }}
          />
      {/* <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          gestureEnabled: false,
          title: status + " | Points: " + points,
          //headerLeft: () => null,
          headerLeft: () => 
          <Text
              style={styles.container}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              color="#fff"
            ><Ionicons name="menu-outline" size={40} color="white" /></Text>,
          headerStyle: {
            backgroundColor: screenColors
          }
        }}
      /> */}
      <RootStack.Screen 
        name="RegisterScreen" 
        component={RegisterScreen} 
        options={{ headerShown: false}}
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
