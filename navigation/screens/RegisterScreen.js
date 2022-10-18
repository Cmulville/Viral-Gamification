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
  ScrollView,
} from "react-native";

function RegisterScreen({ navigation }) {
  const [emailReg, setEmail] = useState("");
  const [usernameReg, setUsername] = useState("");
  const [passwordReg, setPassword] = useState("");
  const [confirmPasswordReg, setConfirmPassword] = useState("");
  const [firstNameReg, setFirstName] = useState("");
  const [lastNameReg, setLastName] = useState("");

  /**
   * Sends a request to the server for there to be a new user under the details entered on this page
   * Checks conditions are met for the account
   */
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
      })
        .then((response) => {
          console.log(response);
          if (response.data.existing) {
            Alert.alert(
              "Registration Error",
              "+ User already exists, try changing username or email",
              [{ text: "OK" }]
            );
          } else if (response.data.complete) {
            navigation.navigate("LoginScreen");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  /**
   * 6 text inputs for entering your deatils as well as a button to send the request
   */
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          onChangeText={setFirstName}
          placeholderTextColor="#003f5c"
          placeholder="First Name"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          onChangeText={setLastName}
          placeholderTextColor="#003f5c"
          placeholder="Last Name"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          onChangeText={setUsername}
          placeholderTextColor="#003f5c"
          placeholder="Username"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          onChangeText={setEmail}
          placeholderTextColor="#003f5c"
          placeholder="Email"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          onChangeText={setPassword}
          placeholderTextColor="#003f5c"
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#003f5c"
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
      </View>

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
    backgroundColor: "#0b4c68",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "sans-serif",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    width: "70%",
    height: 50,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  TextInput: {
    height: 20,
    flex: 1,
    padding: 0,
    marginLeft: 15,
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
    backgroundColor: "#da0f0f",
  },
});
