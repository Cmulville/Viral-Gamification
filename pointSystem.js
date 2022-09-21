import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const PointSystem = {
    dailyPoints: (status) => {
        const daily_bonus = true;
        //access player status and assign to this variable:
        
        if (!daily_bonus) {
            return 0
        } else {
            //Rather than return, the point tally from the database should be accessed and tallied.
            if(status === "Immune") {
                return 500
            } else if(status === "Infected") {
                return "Got here so far"
            } else if(status === "Cured") {
                return 1000
            }
        }
    },
    //Changes the status of the victim from cured to user
    infect: (user) => {
        //Infect user if infected user is within the corresponding radius
        setStatus = async (values) => {
            try {
                await AsyncStorage.setItem("status", values)
            } catch(e) {
                alert("Couldn't change the status")
            }
        }
    },

    cure: (user) => {
        //cure user once all goals are reached
    
    },

    immunise: (user) => {
        //Immunise user
        
    },

    collect_item: (user, item) => {
        //adds the item to the users database tally based on its name.
    },

    immunity_interact: (user, immune_user) => {

    },

    walking_reward: (user) => {
        //Add the reward points to the user.
    },

    friend_interact:(user, friend) => {
        //Reward based on itneraction
    },

    invite_reward: (user) => {
        //User is the user who provided the add link
        //This user receives an award based on the total friends added database link. 
    },
}

export default PointSystem;