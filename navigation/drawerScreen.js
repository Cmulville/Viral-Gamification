import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { Text, StyleSheet, Button } from "react-native";
import HomeScreen from "./screens/homeScreen";
import SettingsScreen from "./screens/settingsScreen";
import DetailScreen from "./screens/detailScreen";
import MainScreen from "./MainScreen";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { tabContext } from "../tabContext";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function DrawerNav() {
    const Drawer = createDrawerNavigator();
    const { status } = React.useContext(tabContext)
    const { points } = React.useContext(tabContext)
    const { screenColors } = React.useContext(tabContext)
    const navigation = useNavigation();

return (
        <Drawer.Navigator>
        <Drawer.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          gestureEnabled: false,
          title: status + " | Points: " + points,
          //headerLeft: () => null,
          headerLeft: () => 
          <Text
              style={styles.container}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
              color="#fff"
            ><Ionicons name="menu-outline" size={40} color="white" /></Text>,
          headerStyle: {
            backgroundColor: screenColors
          }
        }}
      />
        <Drawer.Screen name="Timer" component={HomeScreen}/>
        <Drawer.Screen name="Settings" component={SettingsScreen}/>
        <Drawer.Screen name="Details" component={DetailScreen} />
        
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  