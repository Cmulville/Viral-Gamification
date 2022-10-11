import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, Button, Image } from 'react-native';

//Screens
import HomeScreen from "./screens/homeScreen";
import SettingsScreen from "./screens/settingsScreen";
import MapScreen from "./screens/mapScreen";
import LoginScreen from "./screens/loginScreen";
import InventoryScreen from "./screens/inventoryScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PointSystem from "../pointSystem";
import { tabContext } from "../tabContext";
import FriendScreen from "./screens/friendScreen";

export default function MainScreen({ navigation }) {
  
  // Screen names
const inventoryName = "Inventory";
const mapName = "Map";
const friendList = "Friends";
const timerName = "Event Timer";

//status and points context
const { status } = React.useContext(tabContext)
const { points } = React.useContext(tabContext)
  
  const statusColours = {
  Healthy: "#05cf02",
  Infected: "#f52718",
  Immune: "#0aefff",
};
const screenColors = statusColours[status];

const Tab = createBottomTabNavigator();

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
          } else if (rn == timerName) {
            iconName = focused ? 'timer': "timer-outline";
          }

          return <Ionicons name={iconName} size={size} color={screenColors} />;
        },
       
          
        })}
      >
        <Tab.Screen name={mapName} component={MapScreen}
        options={{ 
                      tabBarLabel: mapName,
                      headerShown: false
                      }}/>
        <Tab.Screen name={inventoryName} component={InventoryScreen}
        options={{ 
                      tabBarLabel: inventoryName,
                      headerShown: false
                      }}/>
        <Tab.Screen name={friendList} component={FriendScreen} 
        options={{ 
                      tabBarLabel: friendList,
                      headerShown: false
                      }}/>

        <Tab.Screen name={timerName} component={HomeScreen} 
        options={{ 
                      tabBarLabel: timerName,
                      headerShown: false
                      }}/>

      {/* <Tab.Screen name={detailName} component={DetailScreen}/> */}
    </Tab.Navigator>
  );
}
