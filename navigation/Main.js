import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import HomeScreen from './screens/homeScreen';
import SettingsScren from './screens/settingsScreen';
import MapScreen from './screens/mapScreen';


// Screen names
const homeName = "Home"
const settingsName = 'Settings'
const mapName = 'Map'

const Tab = createBottomTabNavigator();

export default function main(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initalRouteName = {homeName}
                screenOptions = {({ route }) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
                        
                        if (rn == homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn == settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        } else if (rn == mapName) {
                            iconName = focused ? 'map' : 'map-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                })}>
            
                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={settingsName} component={SettingsScren}/>
                <Tab.Screen name={mapName} component={MapScreen}/>

            </Tab.Navigator>


        </NavigationContainer>
    )
}