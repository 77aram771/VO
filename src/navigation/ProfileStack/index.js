import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Button, Text, View, TouchableWithoutFeedback, Image} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {BlackPearl, DeepSapphire} from "../../shared/Colors"
import {EditProfile} from "../../screens/ProfileScreen/EditProfile"
import {ProfileScreen} from "../../screens/ProfileScreen"
import {windowHeight, windowWidth} from "../../shared/Const"
import BlurView from "expo-blur/build/BlurView.web";

const ProfileStackScreen = () => {

    const Profile = createStackNavigator()



    function ProfileHeaderLeft({navigation}) {
        return (
            <View
                style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:'#010721',
                    bottom: 0,
                    width: windowWidth,
                    height: 80,
                    opacity: 0.6,
                    flexDirection: 'row',
                    paddingTop: 12,
                }}
            >
                <BlurView
                    intensity="80"
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: windowWidth,
                        height: (windowHeight * 5) / 100 + windowHeight / 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#010721',
                            position: 'absolute',
                            top: 0,
                            opacity: 0.8,
                            width: windowWidth,
                            height: (windowHeight * 5) / 100 + windowHeight / 20,
                        }}
                    >
                    </View>
                </BlurView>

                    <View
                        style={{
                            width: windowWidth,
                            paddingLeft: 10,
                            flexDirection: 'row',
                            height: (windowHeight * 5) / 100,
                            alignItems: 'center',
                        }}
                    >
                    <Text
                        style={{
                            fontSize: 24,
                            color: 'white',
                            width: (windowWidth * 80) / 100,
                        }}
                    >Zaid Al-Hussaini</Text>
                </View>
            </View>
        )
    }

    function ProfileHeaderRight() {
        const openPopup = () => {

        }

        return (
            <TouchableWithoutFeedback onPress={openPopup}>
                <Image
                    source="require('../../assets/images/icons/settings.png')"
                    resizeMode="contain"
                    style={{
                        width: (windowWidth * 20) / 100,
                        height: 20,
                        right: 0,
                    }}
                />
            </TouchableWithoutFeedback>
        );
    }

    return (
        <Profile.Navigator>
            <Profile.Screen
                name="Home"
                component={ProfileScreen}
                options={{headerShown: false, tabBarVisible: false}}
            />
            <Profile.Screen name="EditProfileScreen" component={EditProfile} options={{headerShown: false, tabBarVisible: false}}/>
            {/*<Profile.Screen name="Details" component={DetailsScreen}/>*/}
        </Profile.Navigator>
    )
}

export default ProfileStackScreen
