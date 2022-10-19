import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, StyleSheet, Button } from "react-native";
import HomeScreen from "./screens/homeScreen";

import DetailScreen from "./screens/detailScreen";
import MainScreen from "./MainScreen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { tabContext } from "../tabContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DrawerNav({}) {
  const Drawer = createDrawerNavigator();
  const { status } = React.useContext(tabContext);
  const { points } = React.useContext(tabContext);
  const { screenColors } = React.useContext(tabContext);
  const navigation = useNavigation();

  /**
   * Drawer navigations that can navigate between the users account, the main gameplay and the event countdown screens
   */
  return (
    <Drawer.Navigator
      //Main navigator class
      screenOptions={({ route }) => ({
        headerLeft: () => (
          <Text
            style={styles.container}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
            color="#fff"
          >
            <Ionicons name="menu-outline" size={40} color="white" />
          </Text>
        ),
        headerStyle: {
          backgroundColor: screenColors,
        },
      })}
    >
      <Drawer.Screen
        // Switches to the main game
        name="MainScreen"
        component={MainScreen}
        options={{
          drawerLabel: "Game",
          gestureEnabled: false,
          title: status + " | Points: " + points,
          headerLeft: () => (
            <Text
              style={styles.container}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              color="#0b4c68"
            >
              <Ionicons name="menu-outline" size={40} color="white" />
            </Text>
          ),
          headerStyle: {
            backgroundColor: screenColors,
          },
        }}
      />

      <Drawer.Screen
        //switches to screen with the phase countdown
        name="Event Countdown"
        component={HomeScreen}
        options={{
          drawerLabel: "Event Countdown",
        }}
      />

      <Drawer.Screen
        //Switches to screen about the user
        name="Account"
        component={DetailScreen}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
