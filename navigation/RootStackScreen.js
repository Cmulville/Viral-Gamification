import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/loginScreen";
import MainScreen from "./MainScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tabContext } from "../tabContext";
import { color } from "react-native-reanimated";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  const { status } = React.useContext(tabContext)
  const { points } = React.useContext(tabContext)
  const { screenColors } = React.useContext(tabContext)
  // const[user, setUser] = React.useState(null)
  // const[points, setPoints] = React.useState(0)
  // const[status, setStatus] = React.useState(null)

  // React.useEffect(() => {
  //   getUserData();
  // }, []);
  
  // const getUserData = async () => {   
  //   let values
  //     try {
  //       const userGet = await AsyncStorage.getItem('user');
  //       const pointsGet = await AsyncStorage.getItem('points');
  //       const statusGet = await AsyncStorage.getItem('status');
  //       if(userGet !== null && pointsGet !== null && statusGet !== null) {
  //         setUser(userGet)
  //         setPoints(pointsGet)
  //         setStatus(statusGet)
  //         alert("saved as "+user+" "+points+" "+status)
  //       } else {
  //         const userInfo = ['user', 'Rory2']
  //         const pointsStore = ['points', JSON.stringify(1)]
  //         const statusStore = ['status', 'Infected']
  //         await AsyncStorage.multiSet([userInfo, pointsStore, statusStore])
  //         alert("All of em should be stored")
  //       }
  //     } catch(e) {
  //       alert('Failed to get data from storage')
  //   }
  // }
  
  return (

    <RootStack.Navigator>
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}

      />
      <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: status + " | Points:" + points,
          headerStyle: {
            backgroundColor: screenColors
          }
        }}
      />
      <RootStack.Screen 
        name="RegisterScreen" 
        component={RegisterScreen} 
        options={{ headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
