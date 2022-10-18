import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { tabContext } from "./tabContext";
import RootStackScreen from "./navigation/RootStackScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import moment from "moment/moment";

export default function App() {
  LogBox.ignoreAllLogs();

  const [status, setStatus] = React.useState(null);
  const [points, setPoints] = React.useState(0);
  const [email, setEmail] = React.useState(0);
  const [items, setItems] = React.useState([0, 0, 0, 0, 0, 0]);
  const [username, setUsername] = React.useState("");
  const [eventEndTIme, setEventEndTime] = React.useState(0);
  const [immunityTimer, setImmunityTimer] = React.useState(0);
  const [logged_in, setLoggedIn] = React.useState(false);
  const [friends, setFriends] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [modalVis, setModalVis] = React.useState(true);
  const [game_expiry, set_game_expiry] = React.useState(0);

  // Our 3 main statuses in the game
  const statusColours = {
    Healthy: "#05cf02",
    Infected: "#f52718",
    Immune: "#0aefff",
  };
  const screenColors = statusColours[status];

  /**
   *
   * @param {*} email
   */
  const getUserInventory = (email) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/getUserInventory",
      {
        email: email,
      }
    ).then((response) => {
      if (response.data.message) {
        console.log("Couldn't get items");
      } else {
        const userInventory = [];
        console.log(response.data.items);
        response.data.items.forEach((element) => {
          console.log(element.ItemID);
        });
      }
    });
  };

  const updateStatusDB = (email, status) => {
    console.log("DB status is ", status, email);
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/updateStatus",
      {
        infectionStatus: status,
        email: email,
      }
    ).then((response) => {
      console.log("Here!");
      if (response.data.message) {
        alert("Status fail");
      } else {
        console.log("New Status: " + status);
        alert("Status success");
      }
      console.log("Your new status is " + status);
    });
  };

  const updatePointsDB = (points) => {
    console.log("These are the points going in: " + points);
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/updatePoints",
      {
        email: email,
        points: points,
      }
    ).then((response) => {
      if (response.data.message) {
        alert("Points fail");
      } else {
        console.log("New Points again: " + points);
        alert("Points success");
      }
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

  const set_active_LoggedIn = () => {
    setLoggedIn(true);
  };

  const statusChange = (new_status) => {
    console.log(new_status, status);

    if (new_status == "Immune") {
      const date = moment()
        .add(3, "d")
        .utcOffset("+10:00")
        .format("YYYY-MM-DD hh:mm:ss");

      setImmunityTimer(date);
      updateImmunityTimer(date);
    } else {
      setImmunityTimer(0);
      updateImmunityTimer("N/A");
    }

    setStatus(new_status);
    if (email != 0) {
      updateStatusDB(email, new_status);
    }
    console.log("New_status is", new_status);

    // } catch(e) {
    // }
  };

  const updateImmunityTimer = (time) => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/setImmunityTimer",
      {
        time: time,
        email: email,
      }
    ).then((response) => {
      if (response.data.message) {
        alert("Daily fail");
      } else {
        console.log("Immunity set to " + time);
      }
    });
  };

  const updateStatus = (email, new_status, ImmunityCountdown) => {
    //console.log(ImmunityCountdown)
    if (new_status == "Immune") {
      const date = moment().utcOffset("+10:00").format("YYYY-MM-DD hh:mm:ss");

      const diffr = moment.duration(
        moment(ImmunityCountdown).diff(moment(date))
      );
      const hours = parseInt(diffr.asHours());
      const minutes = parseInt(diffr.minutes());
      const seconds = parseInt(diffr.seconds());

      const timeDiff = hours * 60 * 60 + minutes * 60 + seconds;

      if (timeDiff <= 0) {
        statusChange("Healthy");
        updateStatusDB(email, "Healthy");
        console.log("Immunity over, time to be healthy");
      } else {
        setStatus(new_status);
        setImmunityTimer(ImmunityCountdown);
        updateImmunityTimer(ImmunityCountdown);
      }
    } else {
      setStatus(new_status);
    }
  };

  const addPoints = (new_points) => {
    console.log(new_points, typeof new_points);
    try {
      const value = parseInt(points) + new_points;

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
          // console.log("item results");
          // console.log(response.data.result);

          const dbItems = [];
          for (var i = 0; i < 6; i++) {
            for (var j = 0; j < response.data.result.length; j++) {
              if (i == response.data.result[j].ItemID) {
                dbItems.push(response.data.result[j].Amount);
                break;
              }
            }
            if (dbItems.length != i + 1) {
              dbItems.push(0);
            }
          }
          setItems(dbItems);
        }
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  const cure_user = () => {
    console.log("HERE");
    console.log(username);
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/user/cure_user",
      {
        username: username,
      }
    )
      .then((response) => {
        console.log("HERE 2");
        if (response.data.err) {
          console.log("Couldn't cure you. Sorry");
        } else {
          const new_items = [];
          console.log(items.length);
          for (var i = 0; i < items.length; i++) {
            // if (items[i] < 5) {
            //   new_items.push(0)
            // } else {
            //   new_items.push(items[i] - 5)
            // }
            new_items.push(items[i] - 5);
          }
          setItems(new_items);
        }
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  const reset_game_stats = () => {
    Axios.post(
      "https://deco3801-betterlatethannever.uqcloud.net/reset_game_stats",
      {}
    )
      .then((response) => {
        console.log("HERE 2");
        if (response.data.err) {
          console.log("Couldn't cure you. Sorry");
        } else {
          alert("Round Over!");
          set_game_expiry(
            moment()
              .add(7, "d")
              .utcOffset("+10:00")
              .format("YYYY-MM-DD hh:mm:ss")
          );
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
        immunityTimer,
        setEventEndTime,
        setItems,
        updateStatus,
        statusChange,
        updatePoints,
        addPoints,
        set_active_email,
        set_active_username,
        updateDailyBD,
        setImmunityTimer,
        updateItems,
        updateImmunityTimer,
        cure_user,
        logged_in,
        setLoggedIn,
        set_active_LoggedIn,
        friends,
        reset_game_stats,
        game_expiry,
        set_game_expiry,
        setFriends,
        myFriends,
        requests,
        setRequests,
        showRequests,
        modalVis,
        setModalVis,
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
