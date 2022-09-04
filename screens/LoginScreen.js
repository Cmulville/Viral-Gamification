import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorAlert = () => {
      Alert.alert(
          "Invalid Login",
          "Login details did not exist",
          [{text: "Cancel", style: "cancel"}, {text: "OK"}]
      );
  }

   const validAlert = () => {
      Alert.alert(
          "Valid Login",
          "User exists",
          [{text: "Cancel", style: "cancel"}, {text: "OK"}]
      );
  }
               
  const login = () => {
    Axios.post('https://deco3801-betterlatethannever.uqcloud.net/login', {
	email: email,
	password: password
    }).then((response) => {
        if (response.data.message) {
            errorAlert();
        } else {
            validAlert();
        }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
      />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text></Text>
        <Text style={styles.forgot_button}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={login}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
    width: "100%",
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
