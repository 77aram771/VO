import React, {useState, useRef, useContext, useEffect} from "react"
import {
    ActivityIndicator,
    Keyboard,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing,
    FlatList,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView, Modal, AsyncStorage
} from "react-native";
import {Video} from "../../../components/UI/Video"
import {API_URL, windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {EditProfile} from "../../ProfileScreen/EditProfile";
import Context from "../../../../Context";
import {MyVideos} from "../MyVideos"
import {WatchedVideos} from "../WatchedVideos";
import {LikedVideos} from "../LikedVideos";
import {Settings} from "../Settings";
import axios from "axios";
import Camera from "expo-camera/src/Camera";


const DATA = [
    {
        id: "1",
        status: "premium",
        duration: "56:00",
        posted_at: "2020-02-21",
        comments: "66K",
        likes: "146K",
        name: "Stranger Things",
        description:
            "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/video-image.png",
    },
    {
        id: "2",
        status: "premium",
        duration: "56:00",
        posted_at: "2020-02-21",
        comments: "66K",
        likes: "146K",
        name: "Stranger Things",
        description:
            "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/video-image.png",
    },
    {
        id: "3",
        status: "premium",
        duration: "56:00",
        posted_at: "2020-02-21",
        comments: "66K",
        likes: "146K",
        name: "Stranger Things",
        description:
            "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/video-image.png",
    },
];

export const Profile = ({navigation}) => {

    const [apiErrorText, setApiErrorText] = useState('')
    const top = useRef(new Animated.Value(-300)).current
    const [data, setData] = useState(DATA)
    const {user} = useContext(Context)
    const {setUserInfo} = useContext(Context)
    const {goToEditProfile} = useContext(Context)
    const {profModalVisible} = useContext(Context)
    const {popupModalVisible} = useContext(Context)
    const {openMore} = useContext(Context)
    const {myVideosModalVisible} = useContext(Context)
    const {openMyVideos} = useContext(Context)
    const {watchedVideosModalVisible} = useContext(Context)
    const {openWatchedVideos} = useContext(Context)
    const {likedVideosModalVisible} = useContext(Context)
    const {openLikedVideos} = useContext(Context)
    const {settingsModalVisible} = useContext(Context)
    const {openSettings} = useContext(Context)

    useEffect(() => {
        (async () => {
            getUser()
        })();

    }, []);

    const dismiseKey = () => {
        Keyboard.dismiss();
        Animated.timing(top, {
            toValue: -300,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
        });
    };

    const openPopup = () => {
        Animated.timing(top, {
            toValue: 0,
            duration: 300
        }).start();
    }

    const getUser = async () => {
        console.log('get user')
        const token = await AsyncStorage.getItem('Token')
        await axios
            .get(`${API_URL}/api/User`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + token,
                }
            })
            .then((response) => {
                console.log('res-', response.data)
                if (response.data.accepted == false) {
                    setApiErrorText(response.data.errorMessages[0])
                } else if (response.data.accepted == true) {
                    // let user = response.data.data[0]
                    (async () => {
                        await AsyncStorage.setItem('user', JSON.stringify(response.data.data[0]))
                        setUserInfo(response.data.data[0])
                    })()
                    // setApiErrorText('')
                } else {
                    // setApiErrorText("Something went wrong. Please try again.")
                }
            })
            .catch((error) => {
                console.log(error)
                setApiErrorText("Something went wrong. Please try again.")
            })
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={popupModalVisible}
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableWithoutFeedback onPress={openMore}>
                        <View style={{
                            backgroundColor: 'transparent',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    flex: 1,
                                    width: windowWidth,
                                    backgroundColor: '#161827',
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    paddingTop: 10,
                                    paddingBottom: 50,
                                    paddingRight: 30,
                                    paddingLeft: 30,
                                    position: 'absolute',
                                    bottom: 0,
                                }}

                            >
                                <TouchableOpacity onPress={() => openMyVideos()}>
                                    <View
                                        style={[style.popupItem, {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }]}
                                    >
                                        <View
                                            style={{
                                                marginRight: 5,
                                                paddingTop: 10,
                                                paddingBottom: 10
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/icons/my-videos.png')}
                                                resizeMode="contain"
                                                style={{
                                                    height: 15,
                                                }}
                                            />
                                        </View>
                                        <Text style={style.greyText}>My Videos</Text>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                right: 0
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: 'rgba(235, 235, 245, 0.6)'
                                                }}
                                            >24</Text>
                                            <Image
                                                source={require('../../../assets/images/icons/arrow-right.png')}
                                                resizeMode="contain"
                                                style={{

                                                    height: 15,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openWatchedVideos()}>
                                    <View
                                        style={[style.popupItem, {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }]}
                                    >
                                        <View
                                            style={{
                                                marginRight: 5,
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/icons/watched.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 15
                                                }}
                                            />
                                        </View>
                                        <Text style={style.greyText}>Watched videos</Text>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                right: 0
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    color: 'rgba(235, 235, 245, 0.6)'
                                                }}
                                            >16</Text>
                                            <Image
                                                source={require('../../../assets/images/icons/arrow-right.png')}
                                                resizeMode="contain"
                                                style={{
                                                    height: 15,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openLikedVideos()}>
                                    <View
                                        style={[style.popupItem, {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }]}
                                    >
                                        <View
                                            style={{
                                                marginRight: 5,
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/icons/liked.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 15
                                                }}
                                            />
                                        </View>
                                        <Text style={style.greyText}>Liked Videos</Text>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                right: 0
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/icons/arrow-right.png')}
                                                resizeMode="contain"
                                                style={{
                                                    height: 15,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openSettings()}>
                                    <View
                                        style={[style.popupItem, {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }]}
                                    >
                                        <View
                                            style={{
                                                marginRight: 5,
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/icons/settings-po.png')}
                                                resizeMode="contain"
                                                style={{
                                                    width: 15
                                                }}
                                            />
                                        </View>
                                        <Text style={style.greyText}>Settings</Text>
                                        <View
                                            style={{
                                                position: 'absolute',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                right: 0
                                            }}
                                        >
                                            <Image
                                                source={require('../../../assets/images/icons/arrow-right.png')}
                                                resizeMode="contain"
                                                style={{
                                                    height: 15,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={myVideosModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <MyVideos/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={watchedVideosModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <WatchedVideos/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <Settings/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={likedVideosModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <LikedVideos/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={profModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <EditProfile/>
                    </View>
                </View>
            </Modal>
            <TouchableWithoutFeedback onPress={dismiseKey}>
                <View style={style.container}>
                    <View
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: windowWidth,
                            paddingTop: 25,
                            height: (windowHeight * 10) / 100,
                            opacity: 1,
                            flexDirection: 'row',
                            backgroundColor: '#010721',
                        }}
                    >

                        <View
                            style={{
                                width: (windowWidth * 80) / 100 - 10,
                                paddingLeft: 10,
                                flexDirection: 'row',
                                height: (windowHeight * 10) / 100,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 24,
                                    color: 'white',
                                    width: (windowWidth * 80) / 100,
                                }}
                            >{user ? user.firstName: 'Name'} {user ? user.lastName : 'Surname'}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={openMore}>
                            <Image
                                source={require('../../../assets/images/icons/settings.png')}
                                resizeMode="contain"
                                style={{
                                    width: (windowWidth * 20) / 100,
                                    height: 20,
                                    right: -10,
                                }}
                            />
                        </TouchableWithoutFeedback>

                    </View>
                    <View
                        style={{marginBottom: 20}}
                    >
                        <View
                            style={{
                                width: windowWidth,
                                height: 150,
                                overflow: 'hidden',
                            }}
                        >
                            {user.coverPhoto && (
                                <Image
                                    source={{uri: user.coverPhoto}}
                                    resizeMode="cover"
                                    style={{
                                        width: windowWidth,
                                    }}
                                />
                            )}
                            {user.coverPhoto == null && (
                                <Image
                                    source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
                                    resizeMode="cover"
                                    style={{
                                        width: windowWidth,
                                        top: -50
                                    }}
                                />
                            )}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                top: -20
                            }}
                        >
                            <View
                                style={{
                                    width: windowWidth,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    flexDirection: 'row',
                                }}
                            >
                                <View
                                    style={{
                                        width: (windowWidth * 20) / 100,
                                    }}
                                >
                                    {user.avatar && (
                                        <Image
                                            source={{uri: user.avatar}}
                                            resizeMode="contain"
                                            style={{
                                                height: 80,
                                                left: 0,
                                                borderRadius: 1000,
                                                borderWidth: 4,
                                                borderColor: 'black',
                                            }}
                                        />
                                    )}
                                    {user.avatar == null && user.gender === 'female' && (
                                        <Image
                                            source={require('../../../assets/images/female.png')}
                                            resizeMode="contain"
                                            style={{
                                                width: 80,
                                                height: 80,
                                                left: 0,
                                                borderRadius: 1000,
                                                borderWidth: 4,
                                                borderColor: 'black',
                                            }}
                                        />
                                    )}
                                    {user.avatar == null && user.gender === 'male' && (
                                        <Image
                                            source={require('../../../assets/images/male.jpeg')}
                                            resizeMode="contain"
                                            style={{
                                                width: 80,
                                                height: 80,
                                                left: 0,
                                                borderRadius: 1000,
                                                borderWidth: 4,
                                                borderColor: 'black',
                                            }}
                                        />
                                    )}
                                    {user.avatar == null && user.gender != 'male' && user.gender != 'female' && (
                                        <Image
                                            source={require('../../../assets/images/male.jpeg')}
                                            resizeMode="contain"
                                            style={{
                                                width: 80,
                                                height: 80,
                                                left: 0,
                                                borderRadius: 1000,
                                                borderWidth: 4,
                                                borderColor: 'black',
                                            }}
                                        />
                                    )}
                                </View>
                                <View
                                    style={{
                                        width: (windowWidth * 40) / 100,
                                        justifyContent: 'flex-end',
                                        marginLeft:10
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: 'white',
                                            }}
                                        >{user.firstName} {user.lastName}</Text>
                                        <Text
                                            style={{
                                                backgroundColor: '#0058FF',
                                                color: 'white',
                                                paddingLeft: 5,
                                                paddingRight: 5,
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                overflow: 'hidden',
                                                borderRadius: 5,
                                                marginLeft: 5,
                                            }}
                                        >Pro</Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                width: (windowWidth * 25) / 100,
                                                fontSize: 12,
                                                left: 0,
                                                color: '#A4AEB4',
                                            }}
                                        >55k Followers</Text>
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                left: 0,
                                                color: '#A4AEB4',
                                            }}
                                        >|</Text>
                                        <Text
                                            style={{
                                                width: (windowWidth * 25) / 100,
                                                fontSize: 12,
                                                color: '#A4AEB4',
                                                textAlign: 'right',
                                                right: 0,
                                            }}
                                        >66k Following</Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginTop: 38,
                                        marginLeft: 35,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            textAlign: 'center',
                                            backgroundColor: 'transparent',
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#ffffff',
                                            overflow: 'hidden',
                                            right: 0,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            paddingTop: 0,
                                            paddingBottom: 0,
                                        }}
                                        onPress={() => goToEditProfile()}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: '#FFFFFF',
                                                textAlign: 'center',
                                            }}
                                        >Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: windowWidth,
                                paddingLeft: 15,
                                paddingRight: 15,
                                marginTop: 15,
                                flexDirection: 'row',
                                top: -20
                            }}
                        >
                            {user.deceleration && (
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: 'white',
                                    }}
                                >{user.description}
                                    <TouchableWithoutFeedback>
                                        <Text
                                            style={{
                                                color: '#198CFF',
                                                fontSize: 12,
                                                textDecorationLine: 'underline',
                                            }}
                                        >more</Text>
                                    </TouchableWithoutFeedback>
                                </Text>
                            )}
                            {user.description == null && (
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: 'white',
                                    }}
                                >No about text</Text>
                            )}
                        </View>
                    </View>

                    <View
                        style={{
                            width: windowWidth,
                            height: 1,
                            backgroundColor: '#38383A',
                            top: -20
                        }}
                    ></View>
                    <View
                        style={{
                            marginTop: 20,
                            paddingLeft: 15,
                            paddingRight: 15,
                            top: -20
                        }}
                    >
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                        }}
                        >Videos</Text>

                        <ScrollView
                            content-container-style={{
                                contentContainer: {
                                    paddingVertical: 20,
                                },
                            }}
                            style={{
                                marginTop: 20,
                                height: (windowHeight * 55) / 100
                            }}
                        >
                            <FlatList
                                data={DATA}
                                numColumns=""
                                vertical="true"
                                style={{
                                    marginBottom: 120,
                                }}
                                renderItem={({item, index}) => (<Video item={item}/>)}
                            />
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}
