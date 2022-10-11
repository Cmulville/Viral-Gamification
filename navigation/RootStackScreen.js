import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/loginScreen";
import MainScreen from "./MainScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tabContext } from "../tabContext";
import { color } from "react-native-reanimated";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  const { status } = React.useContext(tabContext)
  const { points } = React.useContext(tabContext)
  const { screenColors } = React.useContext(tabContext)
  // const[user, setUser] = React.useState(null)
  // const[points, setPoints] = React.useState(0)
  // const[status, setStatus] = React.useState(null)

  return (

    <RootStack.Navigator>
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}

      />
      <RootStack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: status + " | Points:" + points,
          headerLeft: () => 
          <Button
              onPress={() => navigation.navigate("Settings")}
              title="Settings"
              color="#fff"
            />
        ,
          headerRight: () => {
          <Button
              onPress={() => navigation.navigate("Settings")}
              title="Settings"
              color="#fff"
            />
        },
          headerStyle: {
            backgroundColor: screenColors
          }
        }}
      />
      <RootStack.Screen 
        name="RegisterScreen" 
        component={RegisterScreen} 
        options={{ headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
