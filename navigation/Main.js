import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import HomeScreen from './screens/homeScreen';
import SettingsScreen from './screens/settingsScreen';
import MapScreen from './screens/mapScreen';
import LoginScreen from './screens/loginScreen';
import DetailScreen from './screens/detailScreen';
import InventoryScreen from './screens/inventoryScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



// Screen names
const homeName = "Home"
const settingsName = 'Settings'
const mapName = 'Map'
const loginName = 'Login'
const detailName = 'Details'
const inventoryName = 'Inventory'

// Player status
const status = 'Immune'
const points = 0
const statusColours = {
  'Cured': '#05cf02',
  'Infected' : '#f52718',
  'Immune' : '#0aefff'
}
const screenColors = statusColours[status]

const Tab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function Main(){
    return (
        <NavigationContainer>
        <Stack.Screen name={loginName} component={LoginScreen} />
            <Tab.Navigator
                initalRouteName = {homeName}
                screenOptions = {                  
                  ({ route, navigation }) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
                        
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        } else if (rn === mapName) {
                            iconName = focused ? 'map' : 'map-outline'
                        // } else if (rn === loginName) {
                        //     iconName = focused ? 'log-in' : 'log-in-outline'
                        // } if (rn === detailName) {
                        //     iconName = focused ? 'person-circle' : 'person-circle-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={screenColors}/>
                    },
                    headerStyle: {
                      backgroundColor: screenColors,
                    //   alignItems: 'center'
                      },
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate(loginName)}
                        title="Login"
                        color="#0"
                      />
                    ),
                    title: status+" | Points:"+" "+points

                })}>
            
                <Tab.Screen name={homeName} component={HomeScreen} 
                  options={{ 
                    tabBarLabel: homeName
                    }}/>
                <Tab.Screen name={mapName} component={MapScreen} options={{ 
                    tabBarLabel: mapName
                    }}/>
                <Tab.Screen name={settingsName} component={SettingsScreen} options={{ 
                    tabBarLabel: settingsName
                    }}/>
                    
                
                <Tab.Screen name={inventoryName} component={InventoryScreen}
                    options = {{tabBarLabel: inventoryName}}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}