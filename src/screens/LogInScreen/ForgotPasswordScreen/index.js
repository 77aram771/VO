import React from 'react';
import {View, Text, ScrollView} from 'react-native'

export function ForgotPasswordScreen() {
    return(
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
                <Text>Forgot Password Screen</Text>
            </View>
        </ScrollView>
    )
}
