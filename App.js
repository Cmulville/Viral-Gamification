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
import moment from "moment/moment";

export default function App() {
  
  const [status, setStatus] = React.useState(null)
  const [points, setPoints] = React.useState(0)
  const [email, setEmail] = React.useState(0)
  const [items, setItems] = React.useState(null)
  const [username, setUsername] = React.useState("")
  const [eventEndTIme, setEventEndTime] = React.useState(0)
  const [immunityTimer, setImmunityTimer] = React.useState(0)

  // Ask about this
  // 6e930c12dc934cbd849bd2be
  const statusColours = {
    Healthy: "#05cf02",
    Infected: "#f52718",
    Immune: "#0aefff",
  };
  const screenColors = statusColours[status];


  const getUserInventory = (email) => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/getUserInventory", {
    email: email,
  }).then((response) => {

    if (response.data.message) {
      console.log("Couldn't get items")
    } else {
      const userInventory = []
      console.log(response.data.items)     
      response.data.items.forEach(element => {
        console.log(element.ItemID)         
      });

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
        //alert('Daily success')
        
      }

    });
  }

  const set_active_email = (userEmail) => {
      setEmail(userEmail)
  }

  const set_active_username = (userName) => {
    setUsername(userName)
}

  const statusChange = async (new_status) => {
    // try {
    //   await AsyncStorage.setItem("status", new_status)
    if (new_status == "Immune") {
      const date = moment().utcOffset('+10:00').format('YYYY-MM-DD hh:mm:ss');
      setImmunityTimer(date)
      updateImmunityTimer(date)
    }  
    
    setStatus(new_status)
    updateStatusDB(new_status)
    console.log("Status Change")

    // } catch(e) {
    // }
  }
  
  const updateImmunityTimer = (time) => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/setImmunityTimer", {
      time: time,
      email: email
    }).then((response) => {
      if (response.data.message) {
        alert('Daily fail')
      } else {
        console.log("Immunity set!")
      }

    });
  }


  const updateStatus = (new_status, ImmunityCountdown) => {
    //console.log(ImmunityCountdown)
    if (new_status == "Immune") {
      const date = moment().utcOffset('+10:00').format('YYYY-MM-DD hh:mm:ss');

      const diffr = moment.duration(moment(ImmunityCountdown).diff(moment(date)));
      const hours = parseInt(diffr.asHours());
      const minutes = parseInt(diffr.minutes());
      const seconds = parseInt(diffr.seconds());

      const timeDiff = hours * 60 * 60 + minutes * 60 + seconds;

      if (timeDiff <= 0) {
        statusChange("Healthy")
        console.log("Immunity over, time to be healthy")
      } else {
        setStatus(new_status)
        setImmunityTimer(ImmunityCountdown)
        updateImmunityTimer(ImmunityCountdown)
      }
    } else {
      setStatus(new_status)
    }  
  }

  const addPoints = async (new_points) => {
    try {
      
      const value = parseInt(points) + new_points
      // console.log(new_points)
      // console.log(value)
            
      await AsyncStorage.setItem("points", JSON.stringify(value))
      
      setPoints(value)
      updatePointsDB(value)
      
      
    } catch(e) {
      alert(e)
    }
  }

  const updatePoints = async (new_points) => {
    try {
            
      //console.log(new_points)
            
      await AsyncStorage.setItem("points", JSON.stringify(new_points))
      
      setPoints(new_points)
      
      //console.log(points)
      //updatePointsDB(new_points)

    } catch(e) {
      alert(e)
    }
  }


  return (
    <tabContext.Provider value={{items, status, points, email, username, eventEndTIme, screenColors, immunityTimer, setEventEndTime, setItems, updateStatus, statusChange, updatePoints, addPoints, set_active_email, set_active_username, updateDailyBD, setImmunityTimer, updateImmunityTimer}}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </tabContext.Provider>
  );
}

const styles = StyleSheet.create({});
