import * as React from 'react';
import { View, Text } from 'react-native'
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

const timeLeft = 0

export default function HomeScreen({navigation}) {
    
    const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('time')
      if(value == null) {
        // value previously stored
        const storeData = async (value) => {
          try {
            const jsonValue = JSON.stringify(604800)
            await AsyncStorage.setItem('time', jsonValue)
            return 604800
          } catch (e) {
            // saving error
          }
        }
      }
      else {
        return value
      }
    } catch(e) {
    // error reading value
  }
}

    const storeData = async (time) => {
    try {
      const jsonValue = JSON.stringify(time)
      await AsyncStorage.setItem('time', jsonValue)
    } catch (e) {
      // saving error
    }
}
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
        <CountDown
        size={30}
        until={getData < 604800 && getData > 0 ? getData : 604800}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: '#1CC625', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['D', 'H', 'M', 'S']}
        showSeparator
      />
      
        <Text
                onPress={() => alert('This is the "Home" screen')}
                style={{ fontSize: 26, fontWeight: 'bold'}}>Home Screen</Text>
        </View>
    )
} 
