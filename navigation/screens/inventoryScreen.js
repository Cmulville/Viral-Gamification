import * as React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
// import EncryptedStorage from 'react-native-encrypted-storage';

// async function retrieveUserSession() {
//     try {   
//         const session = await EncryptedStorage.getItem("user_session");
    
//         if (session !== undefined) {
//             return session
//             //Session should identify a username; might make it return a list
//             //True is the same as the presence of value
//             //This username can be used to retrieve stuff from the database
//         }
//     } catch (error) {
//         console.log(error.code);    
//     }
// }

export default function InventoryScreen({navigation}) {
    //session = retrieveUserSession();
    //Session should include a username/email which will be used to access these inventory stats 
    const sumSanitizer = 0
    const santizerGoal = 33
    const sumGloves = 0
    const gloveGoal = 53
    const sumFaceMask = 0
    const faceMaskGoal = 9
    const cureMe = !(sumSanitizer == santizerGoal && sumFaceMask == faceMaskGoal && sumGloves == gloveGoal)

    return (
        <View style={styles.container}>
            
                <View>
                    <Text style={styles.header}>Inventory </Text>
                </View>

                <ScrollView >
                <View style={styles.item_container}>
                    <View style={styles.items}>
                        <Button title='Santitizer' />   
                        <Text style={{fontSize: 22}}>{sumSanitizer}/{santizerGoal} </Text>
                    </View>
                        
                    <View style={styles.items}>
                        <Button title='Gloves' />
                        <Text style={{fontSize: 22}}>{sumGloves}/{gloveGoal} </Text>
                    </View>    

                    <View style={styles.items}>
                        <Button title='Face Masks' />       
                        <Text style={{fontSize: 22}}>{sumFaceMask}/{faceMaskGoal} </Text>
                    </View>
                </View>
                <View>
                    <Button onPress={() => alert('You are cured!')} 
                            color='#00c749'
                            title='Cure me!'
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
        marginVertical: 16
    }

  });