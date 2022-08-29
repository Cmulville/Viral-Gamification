import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import HomeScreen from './screens/homeScreen';
import SettingsScreen from './screens/settingsScreen';
import MapScreen from './screens/mapScreen';
import LoginScreen from './screens/loginScreen';
import DetailScreen from './screens/detailScreen';


// Screen names
const homeName = "Home"
const settingsName = 'Settings'
const mapName = 'Map'
const loginName = 'Login'
const detailName = 'Details'

const Tab = createBottomTabNavigator();

export default function Main(){
    return (
        <NavigationContainer>
            <Tab.Navigator
                initalRouteName = {homeName}
                screenOptions = {({ route }) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
                        
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === settingsName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        } else if (rn === mapName) {
                            iconName = focused ? 'map' : 'map-outline'
                        } else if (rn === loginName) {
                            iconName = focused ? 'log-in' : 'log-in-outline'
                        } if (rn === detailName) {
                            iconName = focused ? 'person-circle' : 'person-circle-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                })}>
            
                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={settingsName} component={SettingsScreen}/>
                <Tab.Screen name={mapName} component={MapScreen}/>
                <Tab.Screen name={loginName} component={LoginScreen}/>
                <Tab.Screen name={detailName} component={DetailScreen}/>

            </Tab.Navigator>


        </NavigationContainer>
    )
}