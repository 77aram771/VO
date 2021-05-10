import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Button, Text, View} from "react-native"

const ExploreStackScreen = () => {

    const Explore = createStackNavigator()

    function ExploreScreen({navigation}) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Explore screen</Text>
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
        <Explore.Navigator>
            <Explore.Screen name="Explore" component={ExploreScreen}/>
            <Explore.Screen name="Details" component={DetailsScreen}/>
        </Explore.Navigator>
    )
}

export default ExploreStackScreen
