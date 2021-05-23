import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Text, View} from "react-native"
import {HomeScreen} from "../../screens/HomeScreen"
import {LinearGradient} from "expo-linear-gradient"
import {BlackPearl, DeepSapphire} from "../../shared/Colors"
import {HeaderLogo} from "../../components/HeaderLogo"
import {HeaderRightSection} from "../../components/HeaderRightSection"
import {Notifications} from "../../screens/HomeScreen/Notifications"

const HomeStackScreen = ({navigation}) => {

    const Home = createStackNavigator()

    function DetailsScreen() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Details!</Text>
            </View>
        )
    }

    return (
        <Home.Navigator>
            <Home.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: '',
                    headerBackground: () => (
                        <LinearGradient
                            colors={[DeepSapphire, BlackPearl]}
                            style={{flex: 1}}
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                        />
                    ),
                    headerLeft: () => <HeaderLogo/>,
                    headerRight: () => (<HeaderRightSection navigation={navigation}/>),
                }}
            />
            <Home.Screen name="Details" component={DetailsScreen}/>
            <Home.Screen name="NotificationsScreen" component={Notifications}/>
        </Home.Navigator>
    )
}

export default HomeStackScreen
