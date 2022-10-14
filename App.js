import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { tabContext } from "./tabContext";
import RootStackScreen from "./navigation/RootStackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
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
  const [status, setStatus] = React.useState(null);
  const [points, setPoints] = React.useState(0);
  const [email, setEmail] = React.useState(0);
  const [username, setUsername] = React.useState(0);
  const [items, setItems] = React.useState(null);
  const [eventEndTIme, setEventEndTime] = React.useState(0);
  const [friends, setFriends] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  // Ask about this
  // 6e930c12dc934cbd849bd2be
  const statusColours = {
    Healthy: "#05cf02",
    Infected: "#f52718",
    Immune: "#0aefff",
  };
  const screenColors = statusColours[status];

  const getUserInventory = (email) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/getUserInventory",
      {
        email: email,
      }
    )
      .then((response) => {
        if (response.data.message) {
          console.log("Couldn't get items");
        } else {
          const userInventory = [];
          console.log(response.data.items);
          response.data.items.forEach((element) => {
            console.log(element.ItemID);
          });
        }
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  const updateStatusDB = (status) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/updateStatus",
      {
        email: email,
        infectionStatus: status,
      }
    )
      .then((response) => {
        console.log("Here!");
        if (response.data.message) {
          alert("Status fail");
        } else {
          console.log("New Status: " + status);
          alert("Status success");
        }
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  const updatePointsDB = async (points) => {
    console.log("These are the points going in: " + points);
    await Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/updatePoints",
      {
        email: email,
        points: points,
      }
    )
      .then((response) => {
        console.log("Points request made!");
        if (response.data.message) {
          alert("Points fail");
        } else {
          console.log("New Points again: " + points);
          alert("Points success");
        }
      })
      .catch((error) => {
        console.log("ERROR WITH POINTS UPDATE 1");
      });
  };

  const updateDailyBD = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/updateDaily",
      {
        email: email,
      }
    )
      .then((response) => {
        if (response.data.message) {
          alert("Daily fail");
        } else {
          //alert('Daily success')
        }
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  const set_active_email = (userEmail) => {
    setEmail(userEmail);
  };

  const set_active_username = (userName) => {
    setUsername(userName);
  };

  const statusChange = async (new_status) => {
    try {
      await AsyncStorage.setItem("status", new_status);
      setStatus(new_status);
      updateStatusDB(new_status);
      console.log("Status Change");
    } catch (e) {
      alert("Couldn't change the status");
    }
  };

  const updateStatus = async (new_status) => {
    try {
      await AsyncStorage.setItem("status", new_status);
      setStatus(new_status);
      //updateStatusDB(new_status)
    } catch (e) {
      alert("Error updating status");
    }
  };

  const addPoints = (new_points) => {
    console.log(new_points, typeof new_points);
    try {
      const value = parseInt(points) + new_points;
      // console.log(new_points)
      // console.log(value)

      //await AsyncStorage.setItem("points", JSON.stringify(value))

      setPoints(value);
      updatePointsDB(value);
    } catch (e) {
      alert("TROUBLE ADDING POINTS");
    }
  };

  const updatePoints = async (new_points) => {
    try {
      //console.log(new_points)

      await AsyncStorage.setItem("points", JSON.stringify(new_points));

      setPoints(new_points);

      //console.log(points)
      //updatePointsDB(new_points)
    } catch (e) {
      alert("TROUBLE ADDING POINTS");
    }
  };

  //Gets a user's current friend list
  const myFriends = (getUserFriends) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/friends/approved",
      {
        username: getUserFriends,
      }
    ).then((response) => {
      console.log(email);
      console.log(response.data);
      setFriends(response.data.friends);
    });
  };

  //Shows the requests a user currently has from others.
  const showRequests = (getUserReq) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/friends/requested",
      {
        username: getUserReq,
      }
    ).then((response) => {
      console.log(response.data.friends);
      setRequests(response.data.friends);
    });
  };

  const updateItems = (theUsername) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/itemCount",
      {
        username: theUsername,
      }
    )
      .then((response) => {
        if (response.data.err) {
          console.log("Couldn't get items");
        } else {
          console.log("got items");
          setItems(response.data.result);
          console.log(response.data.result);
        }
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  return (
    <tabContext.Provider
      value={{
        items,
        status,
        points,
        email,
        username,
        eventEndTIme,
        screenColors,
        setEventEndTime,
        setItems,
        updateStatus,
        statusChange,
        updatePoints,
        addPoints,
        set_active_email,
        set_active_username,
        updateDailyBD,
        friends,
        setFriends,
        myFriends,
        updateItems,
        requests,
        setRequests,
        showRequests,
      }}
    >
      <StatusBar style="dark" />
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </tabContext.Provider>
  );
}

const styles = StyleSheet.create({});
