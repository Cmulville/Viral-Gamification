import * as React from React

//Gives the player points based on their status. can be accessed via database or async storage 
function daily_points() {
//access player status and assign to this variable:
const status = 'Immune'

//Rather than return, the point tally from the database should be accessed and tallied.
if(status === "Immune") {
    return 500
} else if(status === "Infected") {
    return 200
} else if(status === "Cured") {
    return 1000
}
 //Should consider a token which is true at the beginning of each day (say at midnight) and becomes false after this runs
}

//Changes the status of the victim from cured to user
function infect(victim) {
    //Get victim status and check if they are infected or immune. If not, change their status to infected
}

function collect_item(user, item) {
    //adds the item to the users database tally based on its name.
}

function immunity_interact(user, immune_user) {

}

function walking_reward(user) {
    //Add the reward points to the user.
}

function friend_interact(user, friend) {
    //Reward based on itneraction
} 

function invite_reward(user) {
    //User is the user who provided the add link
    //This user receives an award based on the total friends added database link. 
}