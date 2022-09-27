import { StatusBar } from "expo-status-bar";
import * as React from "react";

import RootStackScreen from "./navigation/RootStackScreen";
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
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
