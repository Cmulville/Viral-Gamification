import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tabContext } from "./tabContext";

const PointSystem = {
    
    dailyPoints: (status, daily_bonus) => {

        //access player status and assign to this variable:
        
        if (daily_bonus == 0) {
            return 0
        } else {
            //Rather than return, the point tally from the database should be accessed and tallied.
            if(status === "Immune") {
                return 500
            } else if(status === "Infected") {
                return 150
            } else if(status === "Healthy") {
                return 1000
            }
        }
    },
    //Changes the status of the victim from Healthy to user
    infect: async () => {
        try {
            const value = await AsyncStorage.getItem("status")
            if (value === 'Healthy') {
                await AsyncStorage.setItem("status", 'Infected')
                alert("You've been infected!")
                
            } else {
                alert('Already Healthy! Keep being healthy!')
            }
        } catch(e) {
            alert("Couldn't change the status")
        }
    },

    //Cure user by setting status to Healthy
    cure: async () => {
            try {
                const value = await AsyncStorage.getItem("status")
                if (value === 'Infected') {
                    await AsyncStorage.setItem("status", 'Healthy')
                    
                    alert('You are Healthy!')
                    
                } else {
                    alert('Already Healthy! Keep being healthy!')
                }
            } catch(e) {
                alert("Couldn't change the status")
            }
            
        },
    //Add points
    cure_bonus: () => {
        //Can add conditions influencing what this figure will be
        return 1000
    },

    //Immunise user        
    immunise: async () => {
            try {
                const value = await AsyncStorage.getItem("status")
                if (value != 'Immune') {
                    await AsyncStorage.setItem("status", 'Immune')
                    alert('You are Immune!')
                    
                } else {
                    alert('Already Immune!')
                }
            } catch(e) {
                alert("Couldn't change the status")
            }
        },

    collect_item: async (item) => {
        const points = 0
        if (item == "Gloves") {
            points == 150
        } else if (item == "Sanitizier") {
            points = 500
        } else if (item == "Face Mask") {
            points = 300
        }
        try {
            await AsyncStorage.setItem("Points", points)
        } catch(e) {
            alert("Couldn't update points")
        }
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