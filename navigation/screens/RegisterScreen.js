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
  Alert,
} from "react-native";

function RegisterScreen({ navigation }) {
  const [emailReg, setEmail] = useState("");
  const [usernameReg, setUsername] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [confirmPasswordReg, setConfirmPassword] = useState("");
  const [firstNameReg, setFirstName] = useState("");
  const [lastNameReg, setLastName] = useState("");

  const register = () => {
    if (confirmPasswordReg != passwordReg) {
      Alert.alert("Password Error", "Passwords entered must match", [
        { text: "OK" },
      ]);
    } else {
      Axios.post("https://deco3801-betterlatethannever.uqcloud.net/register", {
        firstName: firstNameReg,
        lastName: lastNameReg,
        username: usernameReg,
        email: emailReg,
        password: passwordReg,
      }).then((response) => {
        console.log(response.data);
        if (response.data.existing) {
          Alert.alert(
            "Registration Error",
            "User already exists, try changing username or email",
            [{ text: "OK" }]
          );
        } else if (response.data.complete) {
          navigation.navigate("LoginScreen");
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        style={styles.TextInput}
        onChangeText={setFirstName}
        placeholderTextColor="#003f5c"
        placeholder="First Name"
      />

      <TextInput
        style={styles.TextInput}
        onChangeText={setLastName}
        placeholderTextColor="#003f5c"
        placeholder="Last Name"
      />

      <TextInput
        style={styles.TextInput}
        onChangeText={setUsername}
        placeholderTextColor="#003f5c"
        placeholder="Username"
      />

      <TextInput
        style={styles.TextInput}
        onChangeText={setEmail}
        placeholderTextColor="#003f5c"
        placeholder="Email"
      />

      <TextInput
        style={styles.TextInput}
        onChangeText={setPassword}
        placeholderTextColor="#003f5c"
        placeholder="Password"
      />

      <TextInput
        style={styles.TextInput}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#003f5c"
        placeholder="Confirm Password"
      />

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.forgot_button}>
          Already have an account? Login!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn} onPress={register}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterScreen;
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
