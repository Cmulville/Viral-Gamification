import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import PointSystem from '../../pointSystem';
import { tabContext } from '../../tabContext';
import Axios from 'axios';

export default function InventoryScreen({changeStatus}) {
    //session = retrieveUserSession();
    //Session should include a username/email which will be used to access these inventory stats 
    const { status } = React.useContext(tabContext)
    const { updateStatus } = React.useContext(tabContext)
    const { statusChange } = React.useContext(tabContext)
    const { addPoints } = React.useContext(tabContext)
    const { items } = React.useContext(tabContext)
    const { screenColors } = React.useContext(tabContext)

    const santizerGoal = 15
    const gloveGoal = 15
    const faceMaskGoal = 10
    const item2goal = 15    
    const item3goal = 15

    let sumSanitizer = 0
    let sumGloves = 0
    let sumFaceMask = 0
    let item2 = 0
    let item3 = 0

    //Assign Item counts based on ID
    // console.log(items)
    // console.log('inventory')
    items.forEach(element => {
        // console.log(element)
        // console.log ("Split")
        if (element.ItemID == 1) {
            sumSanitizer = element.Count
        } 
        else if (element.ItemID == 2) {
            sumGloves = element.Count
        
        } else if (element.ItemID == 3) {
            sumFaceMask = element.Count
        }
    }); 

    
    //Determine if conditions are set for user to be cleared
    const cureMe = 
        !(sumSanitizer == santizerGoal && sumFaceMask == faceMaskGoal 
            && sumGloves == gloveGoal && item2 == item2goal
            && item3 == item3goal && 
             status == "Infected")
    
    const cureStatus = () => {
        // if (Math.random() <= 0.2) {
        //     statusChange("Immune")
        // } else {
            //PointSystem.cure()
            statusChange("Healthy")
        // }
        addPoints(PointSystem.cure_bonus())
    }


    return (
        <View style={styles.container}>
            
                <View>
                    <Text style={styles.header}>Inventory </Text>
                </View>

                <ScrollView >
                <View style={styles.item_container}>
                    <View style={styles.items}>
                        <Button title='Santitizer'
                        color={screenColors} />   
                        <Text style={{fontSize: 22}}>{sumSanitizer}/{santizerGoal} </Text>
                    </View>
                        
                    <View style={styles.items}>
                        <Button title='Gloves'
                        color={screenColors} />
                        <Text style={{fontSize: 22}}>{sumGloves}/{gloveGoal} </Text>
                    </View>    

                    <View style={styles.items}>
                        <Button title='Face Masks'
                        color={screenColors} />       
                        <Text co style={{fontSize: 22}}>{sumFaceMask}/{faceMaskGoal} </Text>
                    </View>
                </View>
                <View>
                    <Button onPress={
                        cureStatus
                                } 
                            color='#00c749'
                            title='Cure Yourself'
                            disabled={cureMe}></Button>
                </View>
                </ScrollView>

            </View>
        
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    item_container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        margin:10,
        fontSize: 32,
        fontWeight: 'bold'
    },
    items: {
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginVertical: 16,
    }

  });