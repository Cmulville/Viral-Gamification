import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import HomeScreen from "./screens/homeScreen";
import SettingsScreen from "./screens/settingsScreen";
import MapScreen from "./screens/mapScreen";
import LoginScreen from "./screens/loginScreen";
import InventoryScreen from "./screens/inventoryScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PointSystem from "../pointSystem";

export default function MainScreen({ navigation }) {
// Screen names
const inventoryName = "Inventory";
const mapName = "Map";
const friendList = "Friends";
React.useEffect(() => {
  setValues();
}, []);

const setValues = async () => {   
  let values
    try {
      const pointsGet = await AsyncStorage.getItem('points');
      const statusGet = await AsyncStorage.getItem('status');
      if(pointsGet !== null && statusGet !== null) {
        setPoints(pointsGet)
        setStatus(statusGet)
        alert("saved as "+" "+points+" "+status)
      } else {
        alert("No stored points or status. defaults used.")
      }
    } catch(e) {
      alert('Failed to get data from storage')
  }
}

// Player status
const [status, setStatus] = React.useState('Cured');
const [points, setPoints] = React.useState(0)
  //const status = 'Immune'
  //const points = 0
  
const statusColours = {
  Cured: "#05cf02",
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
          }

          return <Ionicons name={iconName} size={size} color={screenColors} />;
        },
            // headerRight: () => (
            //   <Button
            //     onPress={() => navigation.navigate(loginName)}
            //     title="Login"
            //     color="#0"
            //   />
            // ),
            
            title: status+" | Points:"+" "+points
            ,
            headerStyle: {
          backgroundColor: screenColors,

          //   alignItems: 'center'
        },
          
        })}
      >
      <Tab.Screen name='Home' component={HomeScreen} 
      options={{ 
                      tabBarLabel: "Timer",
                      
                      }}
       />
        <Tab.Screen name={mapName} component={MapScreen}
        options={{ 
                      tabBarLabel: mapName,
                      
                      }}/>
        <Tab.Screen name={inventoryName} component={InventoryScreen}
        options={{ 
                      tabBarLabel: inventoryName
                      }}/>
        <Tab.Screen name={friendList} component={SettingsScreen} 
        options={{ 
                      tabBarLabel: friendList
                      }}/>

      {/* <Tab.Screen name={detailName} component={DetailScreen}/> */}
    </Tab.Navigator>
  );
}
