import * as React from 'react';
import { View, Text } from 'react-native'
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { tabContext } from '../../tabContext';


export default function DetailScreen({navigation}) {
    const { endEventTime } = React.useContext(tabContext)
    const { setEventEndTime } = React.useContext(tabContext)
    const { screenColors } = React.useContext(tabContext)
    const { status } = React.useContext(tabContext)
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

  if (status == "Immune") {
    return (
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ color: screenColors, fontSize: 40, fontWeight: 'bold', marginBottom: 30}}>Immunity ends in:</Text>    
        <CountDown
        size={30}
        until={time}
        onFinish={() => {
            setImmunityTimer(0), updateImmunityTimer(0)
        }}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: screenColors}}
        //digitTxtStyle={{color: screenColors}}
        timeLabelStyle={{color: screenColors, fontWeight: 'bold'}}
        separatorStyle={{color: screenColors}}
        timeToShow={['D', 'H', 'M', 'S']}
        showSeparator
      />
      
        
        </View>
    )
  } else {
    return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text
      
      style={{ fontSize: 26, fontWeight: "bold" }}
    >
      Account Screen
    </Text>
  </View>)
  }
} 
