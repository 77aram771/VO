import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Button, Text, View} from "react-native"

const CommunityStackScreen = () => {

    const Community = createStackNavigator()

    function CommunityScreen({navigation}) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Community screen</Text>
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
        <Community.Navigator>
            <Community.Screen name="Community" component={CommunityScreen}/>
            <Community.Screen name="Details" component={DetailsScreen}/>
        </Community.Navigator>
    )
}

export default CommunityStackScreen
