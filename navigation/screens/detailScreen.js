import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { tabContext } from '../../tabContext';


export default function DetailScreen({navigation}) {
    const { screenColors } = React.useContext(tabContext)
    const { status } = React.useContext(tabContext)
    const { statusChange } = React.useContext(tabContext)
    const { points } = React.useContext(tabContext)
    const { username } = React.useContext(tabContext)
    

    const { immunityTimer } = React.useContext(tabContext)
    const { setImmunityTimer } = React.useContext(tabContext)
    const { updateImmunityTimer } = React.useContext(tabContext)

    const date = moment().utcOffset('+10:00').format('YYYY-MM-DD hh:mm:ss');
  //console.log(typeof(date))
  //Can get expiry date from DB
  //console.log(immunityTimer)
  const diffr = moment.duration(moment(immunityTimer).diff(moment(date)));
  //console.log(diffr);
  const hours = parseInt(diffr.asHours());
  const minutes = parseInt(diffr.minutes());
  const seconds = parseInt(diffr.seconds());
  const endTime = hours * 60 * 60 + minutes * 60 + seconds;
  
  const [time, setTime] = React.useState(endTime);
  if (endTime == 0) {
    setTime(endTime +  7 * 24 * 60 * 60)
  }
  var countdown = <View ></View>
  if (status == "Immune") {
    countdown = <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ color: screenColors, fontSize: 40, fontWeight: 'bold', marginBottom: 30}}>Immunity ends in:</Text>    
      <CountDown
      size={30}
      until={time}
      onFinish={() => {
          setImmunityTimer(0), updateImmunityTimer(0), statusChange("Healthy"), alert("Immunity is over now! You're vulnerable to infection again")
      }}
      digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: screenColors}}
      //digitTxtStyle={{color: screenColors}}
      timeLabelStyle={{color: screenColors, fontWeight: 'bold'}}
      separatorStyle={{color: screenColors}}
      timeToShow={['D', 'H', 'M', 'S']}
      showSeparator />
      </View>
    }
    return (
      <View style={styles.container}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View>
                <Text style={styles.header}>
                    Your Account
                </Text>
            </View>
            <Text>
                Username: {username}
            </Text>
            <Text>
                Points: {points}
            </Text>
            <Text>
                Status: {status}    
            </Text>
        </View>
        {countdown}
    
        {/* <View>
          <Button
            
          />
        </View> */}
    </View>
    
    )
} 

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        margin:10,
        fontSize: 32,
        fontWeight: 'bold'
    },
})
