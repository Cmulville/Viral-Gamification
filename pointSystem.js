import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tabContext } from "./tabContext";
import { Alert } from "react-native-web";

const PointSystem = {
  dailyPoints: (status, daily_bonus) => {
    //access player status and assign to this variable:

    if (daily_bonus == 0) {
      return 0;
    } else {
      //Rather than return, the point tally from the database should be accessed and tallied.
      if (status === "Immune") {
        return 750;
      } else if (status === "Infected") {
        return 0;
      } else if (status === "Healthy") {
        return 1000;
      }
    }
  },
  //Changes the status of the victim from Healthy to user
  infect: async () => {
    try {
      const value = await AsyncStorage.getItem("status");
      if (value === "Healthy") {
        await AsyncStorage.setItem("status", "Infected");
        alert("You've been infected!");
      } else {
        alert("Already Healthy! Keep being healthy!");
      }
    } catch (e) {
      alert("Couldn't change the status");
    }
  },

  //Cure user by setting status to Healthy
  cure: async () => {
    try {
      Alert.alert("Cured!", "You have been cured");
      const value = await AsyncStorage.getItem("status");
    } catch (e) {
      alert("Couldn't change the status");
    }
  },
  //Add points
  cure_bonus: () => {
    //Can add conditions influencing what this figure will be
    return 1000;
  },

  //Immunise user
  immunise: async () => {
    try {
      const value = await AsyncStorage.getItem("status");
      if (value != "Immune") {
        await AsyncStorage.setItem("status", "Immune");
        alert("You are Immune!");
      } else {
        alert("Already Immune!");
      }
    } catch (e) {
      alert("Couldn't change the status");
    }
  },

  collect_item: (itemType, status) => {
    const collect_points = [150, 250, 450, 550, 300, 350, 400];
    const collect_points_healthy = [250, 350, 600, 400, 450, 500, 600];

    if (status == "Infected") {
      return collect_points[itemType];
    } else {
      return collect_points_healthy[itemType];
    }
  },

  immunity_interact: (user, immune_user) => {},

  walking_reward: (user) => {
    //Add the reward points to the user.
  },

  friend_interact: (user, friend) => {
    //Reward based on itneraction
  },

  invite_reward: (user) => {
    //User is the user who provided the add link
    //This user receives an award based on the total friends added database link.
  },
};

export default PointSystem;
