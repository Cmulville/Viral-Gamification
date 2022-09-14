import Axios from "axios";
import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FriendScreen({ navigation }) {
  const [addUser, setAddUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState("");

  function logFriends() {
    myFriends();
    getUser();
    console.log(user);
  }

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value != null) {
        setUser(JSON.parse(value));
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const myFriends = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/friends/approved",
      {
        username: "Jackie",
      }
    ).then((response) => {
      setFriends(response.data.friends);
    });
  };

  myFriends();

  return (
    <View>
      <View style={styles.container}>
        <TextInput
            placeholder="Add User"
            placeholderTextColor="#003f5c"
            onChangeText={(addUser) => setAddUser(addUser)}
        />
      </View>
      <Button title="Add Friend" onPress={logFriends} />

      <View style={styles.friendView}>
        {friends.map((friend) => {
          return (
            <View>
              <Text>{friend.Friend1}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 8
  },
  
  friendView: {
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 30,
    borderColor: "#fff",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    width: "100%",
  },
});
