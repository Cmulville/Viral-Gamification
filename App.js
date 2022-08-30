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

import LoginScreen from "./screens/LoginScreen.js";

export default function App() {
  return <LoginScreen />;
}

const styles = StyleSheet.create({});
