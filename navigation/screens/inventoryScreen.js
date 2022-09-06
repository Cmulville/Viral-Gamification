import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
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
    sumSanitizer = 0
    santizerGoal = 100
    sumGloves = 0
    gloveGoal = 100
    sumFaceMask = 0
    faceMaskGoal = 100
    return (
        <View style={styles.container}>
            <Text style={{alignItems: 'center', fontSize: 26, fontWeight: 'bold'}}>Inventory </Text>
            <Text style={{alignItems: 'baseline', fontSize: 14}}>Sanitizer : {sumSanitizer}/{santizerGoal} </Text>
            <Text style={{alignItems: 'baseline', fontSize: 14}}>Gloves: {sumGloves}/{gloveGoal} </Text>
            <Text style={{alignItems: 'baseline', fontSize: 14}}>Face mask: {sumFaceMask}/{faceMaskGoal} </Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });