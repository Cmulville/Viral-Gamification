import * as React from 'react';
import { View, Text } from 'react-native'

export default function FriendScreen({navigation}) {
    return (
        //Will need to get friends list from the screen

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
                onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold'}}>Friends list</Text>
        </View>
    )
} 
