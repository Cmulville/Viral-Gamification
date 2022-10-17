import * as React from 'react';
import { View, Image,Text, StyleSheet, Button } from 'react-native'
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
    const { setLoggedIn } = React.useContext(tabContext)

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
  
  const logout = () => {
    setLoggedIn(false)
    navigation.navigate("LoginScreen")
  }

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
        <View style={{ flex: 1,  justifyContent: "flex-start" ,}}>
            <View style={{ alignItems: "center"}}>
                <Text style={styles.header}>
                    ACCOUNT DETAILS
                </Text>
            </View>
            <View style={{ alignItems: "center"}}>
            <Image source={require("../../assets/images/Avatar.png")}
              style={styles.ImageStyle}
            />
            </View>
            
            <Text style={styles.label}>
                Username: {username}
            </Text>
            
            <Text style={styles.label}>
                Points: {points}
            </Text>
           
            <Text style={styles.label}>
                Status: {status}    
            </Text>
            
        </View>
        {countdown}
    
        
          <Button 
            width={50}
            title='Logout'
            color={screenColors}
            onPress={() => navigation.navigate("LoginScreen")}
          />
        
    </View>
    
    )
} 

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#0b4c68',
        borderColor: "#fff",
        //alignContent:'center',
        
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        color:'#fff',
        margin:10,
        fontSize: 32,
        fontWeight: 'bold'
    },
    label:{
      color:"#fff",
      textAlign:'left',
      justifyContent:'flex-start',
      marginLeft:20,
      marginRight:20,
      fontSize:25,
      borderWidth: 5,
      borderColor: "#113b4d",
      borderRadius: 10,
      padding:15,
      margin:5,
    },
    ImageStyle: {
      resizeMode: "contain",
      height: 150,
      width: 150,
      alignItems:"center",
    },
})
