import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import HomeScreen from "./screens/homeScreen";
import SettingsScreen from "./screens/settingsScreen";
import MapScreen from "./screens/mapScreen";
import LoginScreen from "./screens/loginScreen";
import InventoryScreen from "./screens/inventoryScreen";
import FriendScreen from "./screens/friendScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Screen names
const inventoryName = "Inventory";
const mapName = "Map";
const friendList = "Friends";

// Player status
const status = "Immune";
const points = 0;
const statusColours = {
  Cured: "#05cf02",
  Infected: "#f52718",
  Immune: "#0aefff",
};
const screenColors = statusColours[status];

const Tab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function MainScreen({ navigation }) {
  return (
    <Tab.Navigator
      initalRouteName={MainScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === mapName) {
            iconName = focused ? "navigate" : "navigate-outline";
          } else if (rn === inventoryName) {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (rn == friendList) {
            iconName = focused ? "people" : "people-outline";
          }

          return <Ionicons name={iconName} size={size} color={screenColors} />;
        },

        headerStyle: {
          backgroundColor: screenColors,

          //   alignItems: 'center'
        },
        // headerRight: () => (
        //   <Button
        //     onPress={() => navigation.navigate(loginName)}
        //     title="Login"
        //     color="#0"
        //   />
        // ),

        title: status + " | Points:" + " " + points,
      })}
    >
      <Tab.Screen
        name={mapName}
        component={MapScreen}
        options={{
          tabBarLabel: mapName,
        }}
      />
      <Tab.Screen
        name={inventoryName}
        component={InventoryScreen}
        options={{
          tabBarLabel: inventoryName,
        }}
      />
      <Tab.Screen
        name={friendList}
        component={FriendScreen}
        options={{
          tabBarLabel: friendList,
        }}
      />

      {/* <Tab.Screen name={detailName} component={DetailScreen}/> */}
    </Tab.Navigator>
  );
}
