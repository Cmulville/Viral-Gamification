import Axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import { useFonts } from "expo-font";
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
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/SearchBar.js";
import { tabContext } from "../../tabContext";

export default function FriendScreen({ navigation }) {
  const [addUser, setAddUser] = useState("");
  //const [friends, setFriends] = useState([]);
  //const [user, setUser] = useState("");
  const [foundUser, setFoundUser] = useState([]);
  //  const [requests, setRequests] = useState([]);
  const [iconName, setIconName] = useState("person-add-outline");

  const { username } = React.useContext(tabContext);
  const { myFriends } = React.useContext(tabContext);
  const { friends } = React.useContext(tabContext);
  const { setFriends } = React.useContext(tabContext);
  const { requests } = React.useContext(tabContext);
  const { setRequests } = React.useContext(tabContext);
  const { showRequests } = React.useContext(tabContext);
  const { screenColors } = React.useContext(tabContext);
  const { friendStat } = friendStatusColor();

  //Finds a user for when searching friends to add.
  const searchUsers = () => {
    if (addUser == "") {
      Alert.alert("Username Error", "Username must not be empty", [
        { text: "Ok" },
      ]);
      setFoundUser([]);
      return;
    }

    Axios.post("https://deco3801-betterlatethannever.uqcloud.net/findUser", {
      username: addUser,
    })
      .then((response) => {
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
      })
      .catch((err) => {
        console.log("searchUsers");
      });
  };

  //  const getUser = async () => {
  //    try {
  //      const value = await AsyncStorage.getItem("user");
  //      if (value != null) {
  //        setUser(JSON.parse(value));
  //      } else {
  //        return null;
  //      }
  //    } catch (e) {
  //      console.log(e);
  //    }
  //      console.log(user);
  //  };

  //Retrieves list of friends from the backend
  //  const myFriends = () => {
  //    Axios.post(
  //      "https://deco3801-betterlatethannever.uqcloud.net/friends/approved",
  //      {
  //        username: user,
  //      }
  //    ).then((response) => {
  //        console.log(response.data);
  //        setFriends(response.data.friends);
  //        console.log(response.data.friends);
  //    });
  //  };

  //Shows the requests a user currently has from others.
  //  const showRequests = () => {
  //    Axios.post(
  //      "https://deco3801-betterlatethannever.uqcloud.net/friends/requested",
  //      {
  //        username: user,
  //      }
  //    ).then((response) => {
  //          console.log(response.data.friends);
  //          setRequests(response.data.friends);
  //
  //    }).catch((err) => {
  //        console.log("Error at showReqests");
  //    });
  //   };

  //Has an alert message to confirm request. Calls sendFriendRequest
  const makeRequest = () => {
    setIconName("person-add-outline");
    const message =
      "Are you sure you want to send a friend request to " +
      foundUser[0].Username +
      "?";
    Alert.alert("Friend Request", message, [
      {
        text: "Yes",
        onPress: sendFriendRequest,
      },

      {
        text: "No",
      },
    ]);
  };

  //Send a friend request to a looked up user
  const sendFriendRequest = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/friends/makeRequest",
      {
        requestor: username,
        requestee: foundUser[0].Username,
      }
    )
      .then((response) => {
        console.log(response.data);
        if (response.data.err) {
          Alert.alert("Request Error", "Request already made", [
            { text: "Ok" },
          ]);
        } else if (response.data.success) {
          console.log("here");
          Alert.alert("Request Sent", "The friend request has been sent", [
            { text: "Ok" },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert("Request Error", "Request already made");
      });
  };

  /* Function to send queries to the backend to delete or approve friend requests made*/
  function handleRequest(index, state) {
    if (state) {
      const message =
        "Are you sure you want to accept " +
        requests[index].Friend1 +
        "'s friend request?";
      Alert.alert("Approve Request", message, [
        {
          text: "Yes",
          onPress: () =>
            Axios.post(
              "https://deco3801-betterlatethannever.uqcloud.net/friends/approve",
              {
                requestor: requests[index].Friend1,
                requestee: username,
              }
            ).then((response) => {
              if (response.data.err) {
                console.log(response.data);
              } else {
                showRequests(username);
                myFriends(username);
              }
            }),
        },
        {
          text: "No",
        },
      ]);
    } else {
      const message =
        "Are you sure you want to deny " +
        requests[index].Friend1 +
        "'s friend request?";
      Alert.alert("Deny Request", message, [
        {
          text: "Yes",
          onPress: () =>
            Axios.post(
              "https://deco3801-betterlatethannever.uqcloud.net/friends/deny",
              {
                requestor: requests[index].Friend1,
                requestee: username,
              }
            ).then((response) => {
              if (response.data.err) {
                console.log(response.data);
              } else {
                showRequests(username);
              }
            }),
        },

        {
          text: "No",
        },
      ]);
    }
  }
  function friendStatusColor() {
    if (friends.InfectionStatus == "Healthy") friendStatColor = "#05cf02";
    else if (friends.InfectionStatus == "Infected") friendStatColor = "#d3d3d3";
    else friendStatColor = "#0aefff";
    return friendStatColor;
  }

  function deleteFriend(index) {
    const message =
      "Are you sure you want to remove " +
      friends[index].Username +
      " as a friend?";
    Alert.alert("Remove Friend", message, [
      {
        text: "Yes",
        onPress: () =>
          Axios.post(
            "https://deco3801-betterlatethannever.uqcloud.net/friends/delete",
            {
              requestor: friends[index].Username,
              requestee: username,
            }
          ).then((response) => {
            if (response.data.err) {
              console.log(response.data);
            } else {
              myFriends(username);
            }
          }),
      },

      {
        text: "No",
      },
    ]);
  }

  return (
    <ScrollView style={styles.pageView}>
      <SearchBar searchPhrase={addUser} setSearchPhrase={setAddUser} />
      <View style={{ paddingBottom: 15 }}>
        <Button
          title="Search Friend"
          style={styles.SearchButton}
          onPress={searchUsers}
        />
      </View>
      {foundUser.length != 0 ? (
        <View style={styles.friendView}>
          <View style={styles.container}>
            <Text
              style={{
                fontWeight: "bold",
                textDecorationLine: "underline",
                color: "white",
              }}
            >
              USERNAME
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                textDecorationLine: "underline",
                color: "white",
              }}
            >
              ADD USER
            </Text>
          </View>
          {foundUser.map((friend) => {
            return (
              <View style={styles.container}>
                <Text style={{ color: "white" }}>{friend.Username}</Text>
                <TouchableHighlight
                  underlayColor="none"
                  onPressIn={() => setIconName("person-add-sharp")}
                  onPressOut={makeRequest}
                >
                  <Ionicons name={iconName} color={"white"} size={35} />
                </TouchableHighlight>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ alignItems: "center", paddingBottom: 10 }}></View>
      )}

      <View style={{ alignItems: "flex-start" }}>
        <Text style={styles.label}>CURRENT FRIENDS</Text>
      </View>
      {friends.length != 0 ? (
        <View style={styles.friendView}>
          {friends.map((friend, index) => {
            return (
              <View style={styles.container}>
                <Text style={styles.TextInput}>{friend.Username}</Text>
                <Text
                  style={{
                    color: "#fff",
                    backgroundColor: friendStat,
                    borderWidth: 1,
                    borderRadius: 40,
                    padding: 15,
                    borderColor: friendStat,
                  }}
                >
                  {friend.InfectionStatus}
                </Text>
                <TouchableOpacity onPress={() => deleteFriend(index)}>
                  <Ionicons
                    name={"trash-outline"}
                    color={"#ff0000cc"}
                    size={35}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ alignItems: "center", paddingBottom: 40 }}>
          <Text style={styles.title}>NO FRIENDS CURRENTLY</Text>
        </View>
      )}

      <View style={{ alignItems: "flex-start" }}>
        <Text style={styles.label}>FRIEND REQUESTS</Text>
      </View>

      {requests.length != 0 ? (
        <View style={styles.friendView}>
          {requests.map((request, index) => {
            return (
              <View style={styles.container}>
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "white",
                  }}
                >
                  {request.Friend1}
                </Text>
                <TouchableOpacity onPress={() => handleRequest(index, true)}>
                  <Ionicons
                    name={"checkmark-circle-outline"}
                    color={"green"}
                    size={35}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRequest(index, false)}>
                  <Ionicons
                    name={"close-circle-outline"}
                    color={"red"}
                    size={35}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ alignItems: "center", padding: 20 }}>
          <Text style={styles.title}>NO REQUESTS</Text>
        </View>
      )}
    </ScrollView>
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
  pageView: {
    backgroundColor: "#0b4c68",
  },
  container: {
    display: "flex",
    color: "#fff",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 25,
    color: "#fff",
    backgroundColor: "#113b4d",
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 10,
    marginLeft: 20,
    borderWidth: 5,
    borderRadius: 20,
    padding: 10,
    borderColor: "#113b4d",
  },

  friendView: {
    borderRadius: 40,
    padding: 15,
    borderWidth: 10,
    borderColor: "#0b4c68",
    marginBottom: 20,
    marginLeft: 20,
  },
  SearchButton: {
    borderRadius: 10,
    color: "#fff",
  },

  TextInput: {
    height: 50,
    fontSize: 15,
    flex: 1,
    color: "#fff",
    padding: 10,
    marginLeft: -20,
    width: "100%",
    borderWidth: 5,
    borderRadius: 40,
    padding: 15,
    borderColor: "#113b4d",
  },
});
