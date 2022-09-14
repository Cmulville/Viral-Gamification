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
import { reloadAsync } from "expo-updates";

const myFriends = () => {
  Axios.post(
    "https://deco3801-betterlatethannever.uqcloud.net/friends/approved",
    {
      username: "Jackie",
    }
  ).then((response) => {
    //   console.log(typeof response);
    //   console.log(response.data.friends);

    friends = response.data.friends;
  });
};

var friends = [
  { Friend1: "Neemo" },
  { Friend1: "Nemanja" },
  { Friend1: "Connor" },
];

export default function FriendScreen({ navigation }) {
  const [addUser, setAddUser] = useState("");

  function logFriends() {
    myFriends();
    console.log(friends);
  }

  function DisplayFriends() {}

  return (
    //Will need to get friends list from the screen
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
