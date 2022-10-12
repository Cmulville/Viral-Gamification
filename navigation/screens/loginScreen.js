import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import PointSystem from "../../pointSystem";
import { tabContext } from "../../tabContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("username");
    if (value != null) {
      // value previously stored
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
  }
};

const storeUser = async (value) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateStatus } = React.useContext(tabContext)
  const { updatePoints } = React.useContext(tabContext)
  const { set_active_email } = React.useContext(tabContext)
  const { updateDailyBD } = React.useContext(tabContext)
  const { setItems } = React.useContext(tabContext)


  const errorAlert = () => {
    Alert.alert(
      "Login failed",
      "Your email or password is incorrect. Please try again",
      [{ text: "OK" }]
    );
  };
  //Context will need to be updated through login
  
  const login = () => {
    const login_success = true
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        errorAlert();
        login_success = false
      } else {
        storeUser(response.data[0].Username);
        navigation.navigate("MainScreen");
      }
    });    
    
    //Add user database info to ga e
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/userStats", {
      email: email,
    }).then((response) => {
      
      if (response.data.message) {
        errorAlert(); 
      } else {
        if (login_success) {
          updateStatus(response.data.stat[0].InfectionStatus)
          //console.log(response.data.stat[0])
          updatePoints(response.data.stat[0].Points+PointSystem.dailyPoints(response.data.stat[0].InfectionStatus, response.data.stat[0].dailyLogin))
          //console.log("The DB points: "+(response.data.stat[0].Points+PointSystem.dailyPoints(response.data.stat[0].InfectionStatus, response.data.stat[0].dailyLogin)))
          set_active_email(email)
          // updatePoints(PointSystem.dailyPoints(response.data.stat[0].InfectionStatus, response.data.stat[0].dailyLogin))
          updateDailyBD()
        }
      }

    });

    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/user/getUserInventory", {
      email: email,
    }).then((response) => {
  
      if (response.data.message) {
        console.log("Couldn't get items")
      } else {
        setItems(response.data.items)   
      }
      
    });
    
  };

  const CircleButton = props =>(
    <TouchableOpacity
      style = {{
        margin: props.margin,
        height: props.size,
        width: props.size,
        backgroundColor: props.color,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: props.size *2,
      }}
      onPress={props.onPress}>
        <Text style = {{color: props.textColor, fontSize: props.fontSize,textAlignVertical:"center",textAlign:"center"}}>
          LET'S GET VIRAL
        </Text>
      </TouchableOpacity>
  )

  return (
    <>
      <View style={styles.container}>
      <Text style={styles.titleText}>
          </Text>
      <View style = {styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email" 
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
          />
      </View>
      <View style = {styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
          />
      </View>
      <View style = {styles.circleView}>
        <CircleButton
        size={150}
        color="#da0f0f"
        textColor="white"
        fontSize={30}
        margin={10}
        onPress={login}
      />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style ={styles.newUserView}>Click here to Sign Up!</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      </View> 
    </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0b4c68",
      alignItems: "center",
      justifyContent: "center",
    },
    titleText:{
      fontFamily:"sans-serif",
      textAlign:"center",
      fontSize:20,
      fontWeight:"bold",
    },
    inputView:{
    backgroundColor:"#d3d3d3",
    borderRadius:30,
    width: "70%", 
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
    },
    TextInput: {
      height: 50,
      flex: 1,
      padding: 0,
      marginLeft: 15,
    },
    circleView: {
      alignItems:"center",
    },
    newUserView:{
      color: "white",
      height:50,
      marginBottom: 30,
    }
  });