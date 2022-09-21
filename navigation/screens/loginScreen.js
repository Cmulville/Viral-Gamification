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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorAlert = () => {
    Alert.alert("Login failed", "Your email or password is incorrect. Please try again", [
      { text: "OK" },
    ]);
  };

  const login = () => {
    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        errorAlert();
      } else {
        navigation.navigate("MainScreen")
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")}
      />

      <StatusBar style="dark" />
      
      <TextInput
        style={styles.TextInput}
        onChangeText={setEmail}
        placeholderTextColor="#003f5c"
        placeholder = "Email"
      />

      <TextInput
        style={styles.TextInput}
        onChangeText={setPassword}
        placeholderTextColor="#003f5c"
        placeholder = "Password"
      />

      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.forgot_button}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={login}

      >
        {/* <TouchableOpacity style={styles.loginBtn} onPress={login}> */}
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7bb2be",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    height: 300,
    width: 300,
  },

  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "left",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FFF",
  },
});
