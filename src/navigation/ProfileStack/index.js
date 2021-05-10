import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Button, Text, View} from "react-native"

const ProfileStackScreen = () => {

    const Profile = createStackNavigator()

    function ProfileScreen({navigation}) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Profile screen</Text>
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
        <Profile.Navigator>
            <Profile.Screen name="Profile" component={ProfileScreen}/>
            <Profile.Screen name="Details" component={DetailsScreen}/>
        </Profile.Navigator>
    )
}

export default ProfileStackScreen
