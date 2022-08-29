/*import { StatusBar } from "react-native-web";
import React from 'react'; 
import { View, Text, StyleSheet } from "react-native";


export default function App() {
  return (
    <View
      style={styles.container }
    >
      <Text>Universal React with Better Late than Never</Text>
      <StatusBar style='auto'></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'ffff',
    alignItems: 'center',
    justifyContent:'center'
  }
});*/

import * as React from 'react';
import Main from './navigation/Main';

function App() {
  return (
    <Main/>
  );
}

export default App;
