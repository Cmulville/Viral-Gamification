import * as React from "react";
import { View, Text } from "react-native";
import CountDown from "react-native-countdown-component";
import moment from "moment/moment";
import { tabContext } from "../../tabContext";

export default function HomeScreen({}) {
  const { screenColors } = React.useContext(tabContext);
  const { reset_game_stats } = React.useContext(tabContext);
  const { game_expiry } = React.useContext(tabContext);
  const { set_game_expiry } = React.useContext(tabContext);
  

  const date1 = moment().utcOffset("+10:00").format("YYYY-MM-DD hh:mm:ss");
  const date2 = "2022-11-16 00:00:00"

  
  console.log(date1, date2)
  
  if (game_expiry == 0) {
    set_game_expiry(
      moment().add(7, "d").utcOffset("+10:00").format("YYYY-MM-DD hh:mm:ss")
    );
  }
  const diffr = moment.duration(moment(date2).diff(moment(date1)));
  const hours = parseInt(diffr.asHours());
  const minutes = parseInt(diffr.minutes());
  const seconds = parseInt(diffr.seconds());
  const endTime = hours * 60 * 60 + minutes * 60 + seconds;
  console.log(endTime)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0b4c68",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: screenColors,
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 30,
        }}
      >
        Event ends in:
      </Text>
      <CountDown
        size={30}
        until={endTime}
        onFinish={() => reset_game_stats}
        digitStyle={{
          backgroundColor: "#FFF",
          borderWidth: 2,
          borderColor: screenColors,
        }}
        timeLabelStyle={{ color: screenColors, fontWeight: "bold" }}
        separatorStyle={{ color: screenColors }}
        timeToShow={["D", "H", "M", "S"]}
        showSeparator
      />
    </View>
  );
}
