import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
    <Text
          onPress={() => navigation.navigate('Home')}
          style={{ fontSize: 26, fontWeight: 'bold'}}>Login</Text>
        
 
      <StatusBar style="auto" />

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      
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
      
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7bb2be",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  // image: {
  //   marginBottom: 40,
  //   height: 300,
  //   width: 300,
  // },

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