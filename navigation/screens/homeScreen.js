import * as React from 'react';
import { View, Text } from 'react-native'
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function HomeScreen({navigation}) {  

  const [time, setTime] = React.useState(604800);

  var date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
  var expirydate = '2022-12-23 :00:45';
  var diffr = moment.duration(moment(expirydate).diff(moment(date)));

  var hours = parseInt(diffr.asHours());
  var minutes = parseInt(diffr.minutes());
  var seconds = parseInt(diffr.seconds());
  var endTime = hours * 60 * 60 + minutes * 60 + seconds;

  setTime(endTime)

  React.useEffect(() => {
    getData();
  }, []);

    const saveData = async (value) => {
      try {
        await AsyncStorage.setItem('time', JSON.stringify(value))
        alert('Data successfully saved')
      } catch (e) {
        alert('Failed to save the data to the storage')
      }
    }

//     const getData = async () => {
    
//     try {
//       const value = await AsyncStorage.getItem('time');
//       if(value !== null) {
//         const intValue = parseInt(value)
//         setTime(intValue)
//         alert(time)
//       }
//     } catch(e) {
//       alert('Failed to get data from storage')
//   }
// }

const getData = () => {
  //function to get the value from AsyncStorage
  try {
  AsyncStorage.getItem('time').then(
    (value) =>
      //AsyncStorage returns a promise so adding a callback to get the value
      setTime(parseInt(value))
    //Setting the value in Text
    
  );
  alert("accessed storage!")
  } catch(e) {
    alert("failed to access storage")
}
};

// saveData(time);


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            
        <CountDown
        size={30}
        until={time}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: '#1CC625', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['D', 'H', 'M', 'S']}
        showSeparator
      />
      
        <Text
                onPress={getData}
                style={{ fontSize: 26, fontWeight: 'bold'}}>Home Screen {time}</Text>
        </View>
    )
} 
