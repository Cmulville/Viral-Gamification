import Axios from "axios";
import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Alert
} from "react-native";
import { useState, useEffect } from "react"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FriendScreen({ navigation }) {
  const [addUser, setAddUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState("");
  const [foundUser, setFoundUser] = useState([]);
  const [requests, setRequests] = useState([]);

  function loadPage() {
    getUser();
    myFriends();
    showRequests();
  }

  function searchUsers() {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/findUser",
      {
        username: addUser,
      }
    ).then((response) => {
        if (response.data.noUser) {
          Alert.alert(
            "Username Not Found",
            "The Username you entered does not exist",
            [{ text: "OK" }]
          );
        } else {
          console.log(response.data);
          setFoundUser(response.data.userExists);
          console.log(foundUser);
        }
    }).catch((err) => {
        console.log("searchUsers");
    });
  };
  

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
        username: user,
      }
    ).then((response) => {
        setFriends(response.data.friends);
        console.log(response.data.friends);
    });
  };

  const showRequests = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/friends/requested",
      {
        username: user,
      }
    ).then((response) => {
          console.log(response.data);
          setRequests(response.data.friends);
        
    }).catch((err) => {
        console.log("Error at showReqests");
    });
   }

  getUser();
 
  return (
    <View>
      <View>
        <TextInput
            placeholder="Add User"
            placeholderTextColor="#003f5c"
            onChangeText={(addUser) => setAddUser(addUser)}
        />
      <Button title="Search Friend" onPress={searchUsers}/>
      </View>
      <View style={styles.friendView}>
        {foundUser.map((friend) => {
          return (
            <View>
              <Text>{friend.Username}</Text>
              <Button title="Friend Request"/>
            </View>
          );
        })}
      </View>

    <Button title="Current Friends" onPress={myFriends}/>
      <View style={styles.friendView}>
        {friends.map((friend) => {
          return (
            <View>
              <Text>{friend.Friend1}</Text>
            </View>
          );
        })}
      </View>

      <Text>Friend Requests</Text>
      <Button title="Requested Friend" onPress={showRequests}/>
      <View style={styles.friendView}>
        {requests.map((request) => {
          return (
            <View>
              <Text>{request.Friend1}</Text>
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
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  
  friendView: {
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 20,
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
