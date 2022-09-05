import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function InventoryScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold'}}>Inventory Screen </Text>
                <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold'}}>Inventory Screen </Text>
                <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold'}}>Inventory Screen </Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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