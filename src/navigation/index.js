import React, {useState} from "react"
import {NavigationContainer} from '@react-navigation/native'
import {BottomTabBar, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LogInStackScreen from "./LogInStack"
import HomeStackScreen from "./HomeStack"
import ProfileStackScreen from "./ProfileStack"
import CommunityStackScreen from "./CommunityStack"
import ExploreStackScreen from "./ExploreStack"
import VideoAddStackScreen from "./VideoAddStack"
import {Image} from "react-native"
import {LinearGradient} from "expo-linear-gradient"
import {BlackPearl, DeepSapphire} from "../shared/Colors"
import homeIcon from '../assets/icon/icon-home.png'
import homeIconActive from '../assets/icon/icon-home-active.png'
import exploreIcon from '../assets/icon/icon-explore.png'
import videoAddIcon from '../assets/icon/icon-add.png'
import communityIcon from '../assets/icon/icon-community.png'
import profileIcon from '../assets/icon/icon-profile.png'
import {windowHeight} from "../shared/Const"

const RootNavigation = () => {

    // const [isLoading, setIsLoading] = useState(false)
    const [logIn, setLogIn] = useState(false)

    const Tab = createBottomTabNavigator()

    return (
        <NavigationContainer>
            {logIn ? (
                <Tab.Navigator
                    tabBar={(props) => {
                        return (
                            <LinearGradient
                                colors={[DeepSapphire, BlackPearl]}
                                style={{height: windowHeight / 10}}
                                start={{x: 0, y: 0}}
                                end={{x: 0, y: 1}}
                            >
                                <BottomTabBar
                                    {...props}
                                    style={{backgroundColor: 'transparent'}}
                                />
                            </LinearGradient>
                        )
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeStackScreen}
                        options={{
                            tabBarLabel: () => {
                                return null
                            },
                            tabBarIcon: ({focused}) => (
                                <Image
                                    source={focused ? homeIconActive : homeIcon}
                                    style={{width: 18, height: 21}}
                                    resizeMode={'cover'}
                                />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Explore"
                        component={ExploreStackScreen}
                        options={{
                            tabBarLabel: () => {
                                return null
                            },
                            tabBarIcon: ({focused}) => (
                                <Image
                                    source={focused ? exploreIcon : exploreIcon}
                                    style={{width: 20, height: 20}}
                                    resizeMode={'cover'}
                                />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="VideoAdd"
                        component={VideoAddStackScreen}
                        options={{
                            tabBarLabel: () => {
                                return null
                            },
                            tabBarIcon: ({focused}) => (
                                <Image
                                    source={focused ? videoAddIcon : videoAddIcon}
                                    style={{width: 40, height: 40}}
                                    resizeMode={'cover'}
                                />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Community"
                        component={CommunityStackScreen}
                        options={{
                            tabBarLabel: () => {
                                return null
                            },
                            tabBarIcon: ({focused}) => (
                                <Image
                                    source={focused ? communityIcon : communityIcon}
                                    style={{width: 28, height: 19}}
                                    resizeMode={'cover'}
                                />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileStackScreen}
                        options={{
                            tabBarLabel: () => {
                                return null
                            },
                            tabBarIcon: ({focused}) => (
                                <Image
                                    source={focused ? profileIcon : profileIcon}
                                    style={{width: 18, height: 18}}
                                    resizeMode={'cover'}
                                />
                            )
                        }}
                    />
                </Tab.Navigator>
            ) : (
                <LogInStackScreen/>
            )}
        </NavigationContainer>
    )
}

export default RootNavigation
