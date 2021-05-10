import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Button, Text, View} from "react-native"

const VideoAddStackScreen = () => {

    const VideoAdd = createStackNavigator()

    function VideoAddScreen({navigation}) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>VideoAdd screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        )
    }

    function DetailsScreen() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Details!</Text>
            </View>
        );
    }

    return (
        <VideoAdd.Navigator>
            <VideoAdd.Screen name="VideoAdd" component={VideoAddScreen}/>
            <VideoAdd.Screen name="Details" component={DetailsScreen}/>
        </VideoAdd.Navigator>
    )
}

export default VideoAddStackScreen
