import React from "react"
import {ScrollView, Text, View} from "react-native"
import {styles} from './styles'

export function LogInScreen() {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
                <Text>Log In Screen</Text>
            </View>
        </ScrollView>
    )
}
