import React, {useContext, useEffect, useState} from "react"
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
import {API_URL, windowHeight} from "../shared/Const"
import Context from "../../Context"
import {AsyncStorage} from 'react-native'
import axios from "axios";

axios.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('Token')
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use((response) => {
    return response;
},  (err) => {
    return new Promise(async (resolve, reject) => {
        const originalReq = err.config;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyZGEwOGM3OS0yZmRmLTQzZTMtOTNhNy1hMTlkZThlNzZmY2MiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJ0aWsuaGFrb2JpYW5AZ21haWwuY29tIiwiZXhwIjoxNjIxOTQ3ODUyLCJpc3MiOiJpc3N1ZXIiLCJhdWQiOiJhdWRpZW5jZSJ9.Df4BTcvB1zKLoJLn1rtg692Qm1kv1U0dXY0aD3nf-Bg'
        const refreshToken = 'MmRhMDhjNzktMmZkZi00M2UzLTkzYTctYTE5ZGU4ZTc2ZmNjdGlrLmhha29iaWFuZFZBOFNNanFlaWFLL3FNV1ArWFVtVTlPQUpNNGQ3T21HMmx0Vks1dCttWT0='
        if (err.response.status === 401) {
            await axios.post(`${API_URL}/api/Account/RefreshAccessToken?AccessToken=${token}&RefreshToken=${refreshToken}`)
                .then( async (response) => {
                    await AsyncStorage.setItem('Token', response.data.data[0].accessToken)
                    await AsyncStorage.setItem('refreshToken', response.data.data[0].refreshToken)
                    err.config.headers["Authorization"] = `Bearer ${response.data.data[0].accessToken}`;
                    return axios(err.config);
                });
            return axios(err.config);
        } else {
            return Promise.reject(err);
        }
    });
});

const RootNavigation = () => {

    // const [isLoading, setIsLoading] = useState(false)
    const [logIn, setLogIn] = useState(false)
    const [user, setUser] = useState('')
    const [notModalVisible, setNotModalVisible] = useState(false)
    const [profModalVisible, setProfModalVisible] = useState(false)
    const [popupModalVisible, setPopupModalVisible] = useState(false)
    const [myVideosModalVisible, setMyVideosModalVisible] = useState(false)
    const [watchedVideosModalVisible, setWatchedVideosModalVisible] = useState(false)
    const [likedVideosModalVisible, setLikedVideosModalVisible] = useState(false)
    const [settingsModalVisible, setSettingsModalVisible] = useState(false)
    const [settingsLangModalVisible, setSettingsLangModalVisible] = useState(false)
    const [settingsNotificationModalVisible, setSettingsNotificationModalVisible] = useState(false)
    const [settingsSubscriptionModalVisible, setSettingsSubscriptionModalVisible] = useState(false)
    const [settingsPasswordModalVisible, setSettingsPasswordModalVisible] = useState(false)
    const [settingsEmailModalVisible, setSettingsEmailModalVisible] = useState(false)
    const [settingsAboutModalVisible, setSettingsAboutModalVisible] = useState(false)
    const [settingsDeleteModalVisible, setSettingsDeleteModalVisible] = useState(false)
    const [cameraPopupModalVisible, setCameraPopupModalVisible] = useState(false)

    useEffect(() => {
        (async () => {
            await getUserInfo()
        })()

    }, [])

    const getUserInfo = async () => {
        const token = await AsyncStorage.getItem('Token')
        // console.log(token)
        if(token) {
            const userInfo = await AsyncStorage.getItem('user')
            setUser(JSON.parse(userInfo))
            setLogIn(true)
            // console.log(userInfo)
        }

    }

    const setUserInfo = (data) => {
        // console.log('data-', data)
        setUser(data)
    }

    const setLogin = () => {
        setLogIn(true)
    }

    const setLogout = () => {
        setSettingsModalVisible(!settingsModalVisible)
        setLogIn(false)
    }

    const openNotifications = () => {
        // alert('test')
        setNotModalVisible(!notModalVisible)
    }

    const goToEditProfile = () => {
        // alert('test')
        setProfModalVisible(!profModalVisible)
    }

    const openMore = () => {
        // alert('test')
        setPopupModalVisible(!popupModalVisible)
    }

    const openMyVideos = () => {
        // alert('test')
        setPopupModalVisible(!popupModalVisible)
        if (profModalVisible) {
            setProfModalVisible(!profModalVisible)
        }
        setMyVideosModalVisible(!myVideosModalVisible)
    }
    const openWatchedVideos = () => {
        // alert('test')
        setPopupModalVisible(!popupModalVisible)
        setWatchedVideosModalVisible(!watchedVideosModalVisible)
    }

    const openLikedVideos = () => {
        // alert('test')
        setPopupModalVisible(!popupModalVisible)
        setLikedVideosModalVisible(!likedVideosModalVisible)
    }

    const openSettings = () => {
        // alert('test')
        setPopupModalVisible(!popupModalVisible)
        setSettingsModalVisible(!settingsModalVisible)
    }

    const openSettingsLang = () => {
        // alert('test')
        // setSettingsModalVisible(!settingsModalVisible)
        setSettingsLangModalVisible(!settingsLangModalVisible)
    }

    const openSettingsNotification = () => {
        // alert('test')
        // setSettingsModalVisible(!settingsModalVisible)
        setSettingsNotificationModalVisible(!settingsNotificationModalVisible)
    }

    const openSettingsSubscription = () => {
        // alert('test')
        // setSettingsModalVisible(!settingsModalVisible)
        setSettingsSubscriptionModalVisible(!settingsSubscriptionModalVisible)
    }

    const openSettingsPassword = () => {
        // alert('test')
        // setSettingsModalVisible(!settingsModalVisible)
        setSettingsPasswordModalVisible(!settingsPasswordModalVisible)
    }

    const openSettingsEmail = () => {
        // alert('test')
        // setSettingsModalVisible(!settingsModalVisible)
        setSettingsEmailModalVisible(!settingsEmailModalVisible)
    }

    const openSettingsAbout = () => {
        // alert('test')
        // setSettingsModalVisible(!settingsModalVisible)
        setSettingsAboutModalVisible(!settingsAboutModalVisible)
    }

    const openSettingsDelete = () => {
        // alert('test')
        // setSettingsModalVisible(!settingsModalVisible)
        setSettingsDeleteModalVisible(!settingsDeleteModalVisible)
    }

    const openCameraPopup = () => {
        setCameraPopupModalVisible(!cameraPopupModalVisible)
    }

    const Tab = createBottomTabNavigator()

    return (
        <Context.Provider value={{
            logIn: logIn,
            user: user,
            notModalVisible: notModalVisible,
            profModalVisible: profModalVisible,
            popupModalVisible: popupModalVisible,
            myVideosModalVisible: myVideosModalVisible,
            watchedVideosModalVisible: watchedVideosModalVisible,
            likedVideosModalVisible: likedVideosModalVisible,
            settingsModalVisible: settingsModalVisible,
            settingsLangModalVisible: settingsLangModalVisible,
            settingsNotificationModalVisible: settingsNotificationModalVisible,
            settingsSubscriptionModalVisible: settingsSubscriptionModalVisible,
            settingsPasswordModalVisible: settingsPasswordModalVisible,
            settingsEmailModalVisible: settingsEmailModalVisible,
            settingsAboutModalVisible: settingsAboutModalVisible,
            settingsDeleteModalVisible: settingsDeleteModalVisible,
            cameraPopupModalVisible: cameraPopupModalVisible,
            setLogin:() => setLogin(),
            setLogout:() => setLogout(),
            setUserInfo:(data) => setUserInfo(data),
            openNotifications:() =>  openNotifications(),
            goToEditProfile:() =>  goToEditProfile(),
            openMore:() =>  openMore(),
            openMyVideos:() => openMyVideos(),
            openWatchedVideos:() => openWatchedVideos(),
            openLikedVideos:() => openLikedVideos(),
            openSettings:() => openSettings(),
            openSettingsLang:() => openSettingsLang(),
            openSettingsNotification:() => openSettingsNotification(),
            openSettingsSubscription:() => openSettingsSubscription(),
            openSettingsPassword:() => openSettingsPassword(),
            openSettingsEmail:() => openSettingsEmail(),
            openSettingsAbout:() => openSettingsAbout(),
            openSettingsDelete:() => openSettingsDelete(),
            openCameraPopup:() => openCameraPopup()
        }}>

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
        </Context.Provider>
    )
}

export default RootNavigation
