import React from "react"
import {View, Text, ScrollView, Button} from "react-native"
import {styles} from "./style"
import VideoPlayer from "../../components/VideoPlayer"

export function HomeScreen({navigation}) {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ flex: 1,
                justifyContent: 'center',
                backgroundColor: '#ecf0f1'
            }}
            >
                {/*<Text>Home screen</Text>*/}
                {/*<Button*/}
                {/*    title="Go to Details"*/}
                {/*    onPress={() => navigation.navigate('Details')}*/}
                {/*/>*/}
                <VideoPlayer/>
            </View>
        </ScrollView>
    )
}
