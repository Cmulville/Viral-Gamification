import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Settings Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      
  },
  item_container: {
      flexDirection: 'row',
      justifyContent: 'center'
  },
  header: {
      alignItems: 'center',
      justifyContent: 'center',
      margin:10,
      fontSize: 32,
      fontWeight: 'bold'
  },
  items: {
      marginBottom: 30,
      alignItems: 'center',
      justifyContent: 'center',
  },
  button: {
      marginVertical: 16,
  }

});