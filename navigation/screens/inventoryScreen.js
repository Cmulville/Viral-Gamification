import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import EncryptedStorage from 'react-native-encrypted-storage';

// async function retrieveUserSession() {
//     try {
//         const session = await EncryptedStorage.getItem("user_session");

//         if (session !== undefined) {
//             return session
//             //Session should identify a username; might make it return a list
//             //True is the same as the presence of value
//             //This username can be used to retrieve stuff from the database
//         }
//     } catch (error) {
//         console.log(error.code);
//     }
// }

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("username");
    console.log(value);
    if (value != null) {
      // value previously stored
      return value;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
  }
};

export default function InventoryScreen({ navigation }) {
  //session = retrieveUserSession();
  //Session should include a username/email which will be used to access these inventory stats
  sumSanitizer = 0;
  santizerGoal = 33;
  sumGloves = 0;
  gloveGoal = 53;
  sumFaceMask = 0;
  faceMaskGoal = 9;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header}>Inventory </Text>
      </View>
      <View style={styles.items}>
        <Button title="Santitizer" />
        <Text style={{ fontSize: 22 }}>
          {sumSanitizer}/{santizerGoal}{" "}
        </Text>
      </View>

      <View style={styles.items}>
        <Button title="Gloves" />
        <Text style={{ fontSize: 22 }}>
          {sumGloves}/{gloveGoal}{" "}
        </Text>
      </View>

      <View style={styles.items}>
        <Button title="Face Masks" />
        <Text style={{ fontSize: 22 }}>
          {sumFaceMask}/{faceMaskGoal}{" "}
        </Text>
      </View>

      {/* <Text>{getData}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {},
  item_container: {
    flexDirection: "column",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 58,
    fontSize: 32,
    fontWeight: "bold",
  },
  items: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
