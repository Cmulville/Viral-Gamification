import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { tabContext } from "./tabContext";
import RootStackScreen from "./navigation/RootStackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";


export default function App() {
  
  const [status, setStatus] = React.useState(null)
  const [points, setPoints] = React.useState(0)


  React.useEffect(() => {
    setValues();
  }, []);

  const setValues = async () => {   
    try {
      const pointsGet = parseInt(await AsyncStorage.getItem('points'));
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
  const updateStatus = (status) => {
    setStatus(status)  
  }

  const updatePoints = async (new_points) => {
    try {
      const value = parseInt(points) + new_points
      
      await AsyncStorage.setItem("points", JSON.stringify(value))
      setPoints(value)
    } catch(e) {
      alert("Issues adding points")
    }
    
  }
  return (
    <tabContext.Provider value={{status, points, updateStatus, updatePoints}}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </tabContext.Provider>
  );
}

const styles = StyleSheet.create({});
