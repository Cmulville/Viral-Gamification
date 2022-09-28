import Axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FriendScreen({ navigation }) {
  const [addUser, setAddUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState("");
  const [foundUser, setFoundUser] = useState([]);
  const [requests, setRequests] = useState([]);
  const [numRequests, setNumRequests] = useState(0);
  const [iconName, setIconName] = useState("person-add-outline");

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
          setFoundUser([]);

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
          console.log(response.data.friends);
          setRequests(response.data.friends);
          setNumRequests(0);
          console.log(numRequests);
        
    }).catch((err) => {
        console.log("Error at showReqests");
    });
   };


  const makeRequest = () => {
      setIconName("person-add-outline");
      const message = "Are you sure you want to send a friend request to " 
          + foundUser[0].Username + "?";
      Alert.alert(
            "Friend Request",
            message,
            [
                { 
                    text: "Yes", 
                    onPress: sendFriendRequest
                },
                
                {
                    text: "No"
                }
            ]
          );

  };

  const sendFriendRequest = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/friends/makeRequest",
      {
          requestor: user,
          requestee: foundUser[0].Username,
      }
    ).then((response) => {
          console.log(response.data);
          if (response.data.err) {
            Alert.alert("Request Error", "Request already made", [{text:"Ok"}]);
          } else if (response.data.success) {
            console.log("here");
            Alert.alert("Request Sent", "The friend request has been sent", [{text:"Ok"}]);
          }

    }).catch((err) => {
        Alert.alert("Request Error", "Request already made");
    });
  };

  const handleRequest = () => {
      console.log("TOUCHED");
  };

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
            <View style={styles.container}>
              <Text style={{paddingRight: 40}}>{friend.Username}</Text>
              <TouchableHighlight underlayColor='none' 
                    onPressIn={()=>setIconName("person-add-sharp")} 
                    onPressOut={makeRequest}>
                <Ionicons name={iconName} color={"#43ff64d9"} size={35} />
              </TouchableHighlight>


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

      <Button title="Requested Friend" onPress={showRequests}/>
      <View style={styles.friendView}>
        {requests.map((request, index) => {
          return (
            <View style={styles.container}>
              <Text>{request.Friend1}</Text>
                <TouchableOpacity onPress={handleRequest}>
                    <Ionicons name={'checkmark-circle-outline'} color={"#43ff64d9"} size={35} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRequest}>
                    <Ionicons name={'close-circle-outline'} color={"#ff0000cc"} size={35} />
                </TouchableOpacity>
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
    borderRadius: 20,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
    justifyContent: "center",
  },

  container: {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      alignItems: "center",
  },
  
  friendView: {
    borderRadius: 40,
    //alignItems: "center",
    padding: 15,
    borderWidth: 10,
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
