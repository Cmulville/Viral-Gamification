import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { tabContext } from "./tabContext";
import RootStackScreen from "./navigation/RootStackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from 'axios';
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
import PointSystem from "./pointSystem";

export default function App() {
  
  const [status, setStatus] = React.useState(null)
  const [points, setPoints] = React.useState(0)
  const [email, setEmail] = React.useState(0)
  const [items, setItems] = React.useState(null)

  // Ask about this
  // 6e930c12dc934cbd849bd2be

  const getUserInventory = (email) => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/getUserInventory", {
    email: email,
  }).then((response) => {

    if (response.data.message) {
      console.log("Couldn't get items")
    } else {
      const userInventory = []
      console.log(response.data.items)     
      
    }
    
  });
  }

  const updateStatusDB = (status) => {
    
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/updateStatus", {
      email: email,
      infectionStatus: status,
    }).then((response) => {
      console.log("Here!")
      if (response.data.message) {
        alert('Status fail')
      } else {
        console.log("New Status: "+status)
        alert('Status success')
        
      }

    });
  }

  const updatePointsDB = (points) => {
    console.log("These are the points going in: "+points)
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/updatePoints", {
      email: email,
      points: points,
    }).then((response) => {
      
      if (response.data.message) {
        alert('Points fail')
      } else {
        console.log("New Points again: "+points)
        alert('Points success')
      
      }

    });
  }

  const updateDailyBD = () => {

    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/updateDaily", {
      email: email,
    }).then((response) => {
      
      if (response.data.message) {
        alert('Daily fail')
      } else {
        alert('Daily success')
        
      }

    });
  }

  const set_active_email = (userEmail) => {
      setEmail(userEmail)
  }

  const statusChange = async (new_status) => {
    try {
      
      await AsyncStorage.setItem("status", new_status)
      setStatus(new_status)
      updateStatusDB(new_status)
      console.log("Status Change")

    } catch(e) {
      alert("Couldn't change the status")
    }
  }

  const updateStatus = async (new_status) => {
    try {

      await AsyncStorage.setItem("status", new_status)
      setStatus(new_status)  
      //updateStatusDB(new_status)

    } catch(e) {
        alert("Error updating status")
    }
    
  }

  const addPoints = async (new_points) => {
    try {
      
      const value = parseInt(points) + new_points
      console.log(new_points)
      console.log(value)
            
      await AsyncStorage.setItem("points", JSON.stringify(value))
      
      setPoints(value)
      updatePointsDB(value)
      
      
    } catch(e) {
      alert(e)
    }
  }

  const updatePoints = async (new_points) => {
    try {
            
      console.log(new_points)
            
      await AsyncStorage.setItem("points", JSON.stringify(new_points))
      
      setPoints(new_points)
      
      console.log(points)
      //updatePointsDB(new_points)

    } catch(e) {
      alert(e)
    }
  }


  return (
    <tabContext.Provider value={{items, status, points, email, updateStatus, statusChange, updatePoints, addPoints, set_active_email, updateDailyBD}}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </tabContext.Provider>
  );
}

const styles = StyleSheet.create({});
