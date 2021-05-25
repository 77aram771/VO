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
    TextInput,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView, Modal, AsyncStorage
} from "react-native";
import {API_URL, windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn";
import * as ImagePicker from "expo-image-picker";
import Camera from "expo-camera/src/Camera";
import axios from "axios";
import {MyVideos} from "../MyVideos";
import {WatchedVideos} from "../WatchedVideos";
import {Settings} from "../Settings";
import {LikedVideos} from "../LikedVideos";


export const EditProfile = ({navigation}) => {
    const [devicePlatform, setDevicePlatform] = useState(Platform.OS)
    const [hasPermission, setHasPermission] = useState(null);
    const [apiErrorText, setApiErrorText] = useState('')
    const [apiDoneText, setApiDoneText] = useState('')
    const {user} = useContext(Context)
    const [avatar, setAvatar] = useState(null)
    const [coverPhoto, setCoverPhoto] = useState(null)
    const [cameraPopupModalVisible, setCameraPopupModalVisible] = useState(false)
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [about, setAbout] = useState('')
    const [type, setType] = useState('')
    const [errorFName, setErrorFName] = useState(false)
    const [focusFName, setFocusFName] = useState(false)
    const [errorLName, setErrorLName] = useState(false)
    const [focusLName, setFocusLName] = useState(false)
    const {setUserInfo} = useContext(Context)

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            setAvatar(user.avatar)
            setCoverPhoto(user.coverPhoto)
            setFName(user.firstName)
            setLName(user.lastName)
            setAbout(user.description)
        })();
    }, []);

    const openCamera = async () => {
        if (type === 'avatar') {
            await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            }).then(photo => {
                if (!photo.cancelled) {
                    (async () => {
                        try {
                            const token = await AsyncStorage.getItem('Token')
                            console.log('token-', token)
                            setAvatar(photo.uri)
                            const data = new FormData();
                            data.append('Avatar', {
                                uri: photo.uri,
                                type: 'image/jpg',
                                name: 'image.jpg',
                            });
                            // const data = {
                            //     Avatar: avatar
                            // }
                            console.log(data)
                            await axios
                                .post(`${API_URL}/api/User/Avatar`, data,
                                    {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'Authorization': "Bearer " + token,
                                        }
                                    }
                                )
                                .then((response) => {
                                    console.log('res-', response.data)
                                    if (response.data.accepted == false) {
                                        // setApiErrorText(response.data.errorMessages[0])
                                    } else if (response.data.accepted == true) {
                                        (async () => {
                                            await getUser()
                                        })();
                                        // setApiErrorText('')
                                        // navigation.navigate("TopicScreen")
                                    } else {
                                        // setApiErrorText("Something went wrong. Please try again.")
                                    }
                                })
                                .catch((error) => {
                                    console.log(error.response)
                                    // setApiErrorText("Something went wrong. Please try again.")
                                })
                        } catch (e) {
                            console.log(e)
                        }
                    })();
                }
            })
        } else if (type === 'cover') {
            await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 1,
            }).then(photo => {
                if (!photo.cancelled) {
                    (async () => {
                        try {
                            const token = await AsyncStorage.getItem('Token')
                            console.log('token-', token)
                            setCoverPhoto(photo.uri)
                            const data = new FormData();
                            data.append('CoverPhoto', {
                                uri: photo.uri,
                                type: 'image/jpg',
                                name: 'image.jpg',
                            });

                            await axios
                                .post(`${API_URL}/api/User/CoverPhoto`, data,
                                    {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'Authorization': "Bearer " + token,
                                        }
                                    }
                                )
                                .then((response) => {
                                    console.log('res-', response.data)
                                    if (response.data.accepted == false) {
                                        // setApiErrorText(response.data.errorMessages[0])
                                    } else if (response.data.accepted == true) {
                                        (async () => {
                                            await getUser()
                                        })();

                                        // setApiErrorText('')
                                        // navigation.navigate("TopicScreen")
                                    } else {
                                        // setApiErrorText("Something went wrong. Please try again.")
                                    }
                                })
                                .catch((error) => {
                                    console.log(error)
                                    // setApiErrorText("Something went wrong. Please try again.")
                                })
                        } catch (e) {
                            console.log(e)
                        }
                    })();
                }
            })
        }
    }
    const pickImage = async () => {
        console.log(type)
        if (type === 'avatar') {
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            }).then(result => {
                if (!result.cancelled) {
                    (async () => {
                        try {
                            const token = await AsyncStorage.getItem('Token')
                            console.log('token-', token)
                            setAvatar(result.uri)
                            const fileToUpload = result;
                            const data = new FormData();
                            data.append('Avatar', {
                                uri: result.uri,
                                type: 'image/jpg',
                                name: 'image.jpg',
                            });
                            // const data = {
                            //     Avatar: avatar
                            // }
                            console.log(data)
                            await axios
                                .post(`${API_URL}/api/User/Avatar`, data,
                                    {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'Authorization': "Bearer " + token,
                                        }
                                    }
                                )
                                .then((response) => {
                                    console.log('res-', response.data)
                                    if (response.data.accepted == false) {
                                        // setApiErrorText(response.data.errorMessages[0])
                                    } else if (response.data.accepted == true) {
                                        (async () => {
                                            await getUser()
                                        })();
                                        // setApiErrorText('')
                                        // navigation.navigate("TopicScreen")
                                    } else {
                                        // setApiErrorText("Something went wrong. Please try again.")
                                    }
                                })
                                .catch((error) => {
                                    console.log(error.response)
                                    // setApiErrorText("Something went wrong. Please try again.")
                                })
                        } catch (e) {
                            console.log(e)
                        }
                    })();
                }
            });
        } else if (type === 'cover') {
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 1,
            }).then(result => {
                if (!result.cancelled) {
                    (async () => {
                        try {
                            const token = await AsyncStorage.getItem('Token')
                            console.log('token-', token)
                            setCoverPhoto(result.uri)
                            const data = new FormData();
                            data.append('CoverPhoto', {
                                uri: result.uri,
                                type: 'image/jpg',
                                name: 'image.jpg',
                            });

                            await axios
                                .post(`${API_URL}/api/User/CoverPhoto`, data,
                                    {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                            'Authorization': "Bearer " + token,
                                        }
                                    }
                                )
                                .then((response) => {
                                    console.log('res-', response.data)
                                    if (response.data.accepted == false) {
                                        // setApiErrorText(response.data.errorMessages[0])
                                    } else if (response.data.accepted == true) {
                                        (async () => {
                                            await getUser()
                                        })();

                                        // setApiErrorText('')
                                        // navigation.navigate("TopicScreen")
                                    } else {
                                        // setApiErrorText("Something went wrong. Please try again.")
                                    }
                                })
                                .catch((error) => {
                                    console.log(error)
                                    // setApiErrorText("Something went wrong. Please try again.")
                                })
                        } catch (e) {
                            console.log(e)
                        }
                    })();
                }
            });

        }

    };

    const openCameraPopup = (type) => {
        setType(type)
        setCameraPopupModalVisible(!cameraPopupModalVisible)
    }

    const getUser = async () => {
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
                        setApiDoneText('Changes was saved')
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

    const nameInput = (val) => {
        setFName(val)
    }

    const lnameInput = (val) => {
        setLName(val)
    }

    const aboutInput = (val) => {
        setAbout(val)
    }

    const submite = async () => {
        if (!fname) {
            setErrorFName(true)
            return;
        }
        if (!lname) {
            setErrorLName(true)
            return;
        }
        const data = {
            firstName: fname,
            lastName: lname,
            description: about,
            birthDate: "2016-05-24T20:06:04.865Z",
            id: user.id
        };
        console.log(data)
        try {
            const token = await AsyncStorage.getItem('Token')
            await axios
                .put(`${API_URL}/api/User`, data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    }
                })
                .then((response) => {
                    console.log('res-', response)
                    if (response.data.accepted == false) {
                        setApiErrorText(response.data.errorMessages[0])
                    } else if (response.data.accepted == true) {
                        (async () => {
                            await getUser()
                        })();
                        setApiErrorText('')
                    } else {
                        setApiErrorText("Something went wrong. Please try again.")
                    }
                })
                .catch((error) => {
                    console.log('error-', error)
                    setApiErrorText("Something went wrong. Please try again.")
                })
        } catch (e) {
            console.log(e)
        }
    }

    const {goToEditProfile} = useContext(Context)
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
            visible={cameraPopupModalVisible}
            supportedOrientations={['portrait', 'landscape']}
            presentationStyle="overFullScreen"
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableWithoutFeedback onPress={() => openCameraPopup(type)}>
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
                            <TouchableOpacity onPress={openCamera}>
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
                                            source={require('../../../assets/images/icons/photo.png')}
                                            style={{
                                                width: windowHeight / 45,
                                                height: windowHeight / 45,
                                            }}
                                        />
                                    </View>
                                    <Text style={style.greyText}>Take a photo</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={pickImage}>
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
                                            source={require('../../../assets/images/icons/gallery.png')}
                                            style={{
                                                width: windowHeight / 45,
                                                height: windowHeight / 45,
                                            }}
                                        />
                                    </View>
                                    <Text style={style.greyText}>Choose from your photos</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                <LinearGradient
                    colors={["#181880", "#080836", "#010106", "#000000"]}
                    location={[0, 0.1, 0.4, 1]}
                    style={{
                        position: "absolute",
                        width: windowWidth,
                        height: windowHeight,
                    }}
                />
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
                        <TouchableOpacity onPress={() => goToEditProfile()}
                          style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                          }}
                        >
                            <Image
                                source={require('../../../assets/images/icons/back.png')}
                                resizeMode="contain"
                                style={{
                                    width: (windowWidth * 10) / 100,
                                    height: 20,
                                }}
                            />

                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 24,
                                color: 'white',
                            }}
                        >Edit Profile</Text>
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
                    style={{
                        width: windowWidth,
                        height: 150,
                        overflow: 'hidden',
                    }}
                >
                    {coverPhoto && (
                        <Image
                            source={{uri: coverPhoto}}
                            resizeMode="cover"
                            style={{
                                width: windowWidth,
                                height: 150
                            }}
                        />
                    )}
                    {coverPhoto == null && (
                        <Image
                            source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
                            resizeMode="cover"
                            style={{
                                width: windowWidth,
                                top: -50
                            }}
                        />
                    )}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            zIndex: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            paddingLeft: 5,
                            paddingRight: 5,
                            paddingTop: 5,
                            paddingBottom: 5,
                            borderRadius: 100,
                            alignItems: 'center'
                        }}
                        onPress={() => openCameraPopup('cover')}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                color: '#101348',
                                fontWeight: 'bold'
                            }}
                        >+ Change Cover Photo</Text>
                    </TouchableOpacity>
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
                            {avatar && (
                                <Image
                                    source={{uri: avatar}}
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
                            {avatar == null && user.gender === 'female' && (
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
                            {avatar == null && user.gender === 'male' && (
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
                            {avatar == null && user.gender !== 'male' && user.gender !== 'female' && (
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
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 30,
                                    right: -10,
                                    zIndex: 2,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderRadius: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center'
                                }}
                                onPress={() => openCameraPopup('avatar')}
                            >
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            color: '#101348',
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}
                                    >+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        paddingLeft: 15,
                        paddingRight: 15

                    }}
                >
                    <View style={[style.formGroup, {
                        marginBottom: (windowHeight * 2 ) / 100,
                    }]}
                    >
                        <Text
                            style={{
                                top: 5,
                                fontSize: 12,
                                color: '#A4AEB4'
                            }}
                        >Name</Text>
                        {focusFName && (
                            <Image
                                style={style.focusBlured}
                                source={require('../../../assets/images/backgrounds/focus-blured.png')}
                            />
                        )}
                        {errorFName && (
                            <Image
                                style={style.errorBlured}
                                source={require('../../../assets/images/backgrounds/error-blured.png')}
                            />
                        )}
                        <TextInput
                            style={[style.input, {
                                fontSize: 16,
                                height: (windowHeight * 7 ) / 100,

                                color: '#A4AEB4',
                                borderColor: 'rgba(164, 174, 180, 0.4)',
                                borderBottomWidth: 1,
                            }]}
                            value={fname}
                            placeholder="Name"
                            placeholderTextColor="#A4AEB4"
                            onChangeText={nameInput}
                            onFocus={() => {setFocusFName(true);setErrorFName(false)}}
                            onBlur={() => {setFocusFName(false)}}
                        />
                        {errorFName && (
                            <Text style={style.errorText}>Full name is required field</Text>
                        )}
                    </View>
                    <View style={style.formGroup}>
                        <Text
                            style={{
                                top: 5,
                                fontSize: 12,
                                color: '#A4AEB4'
                            }}
                        >Last Name</Text>
                        {focusLName && (
                            <Image
                                style={style.focusBlured}
                                source={require('../../../assets/images/backgrounds/focus-blured.png')}
                            />
                        )}
                        {errorLName && (
                            <Image
                                style={style.errorBlured}
                                source={require('../../../assets/images/backgrounds/error-blured.png')}
                            />
                        )}
                        <TextInput
                            style={style.input}
                            placeholder="Name"
                            placeholderTextColor="#A4AEB4"
                            onChangeText={lnameInput}
                            value={lname}
                            style={{
                                fontSize: 16,
                                height: (windowHeight * 7 ) / 100,
                                marginBottom: (windowHeight * 2 ) / 100,
                                color: '#A4AEB4',
                                borderColor: 'rgba(164, 174, 180, 0.4)',
                                borderBottomWidth: 1,
                            }}
                            onFocus={() => {setFocusLName(true);setErrorLName(false)}}
                            onBlur={() => {setFocusLName(false)}}
                        />
                        {errorLName && (
                            <Text style={style.errorText}>Last name is required field</Text>
                        )}
                    </View>
                    <View style={style.formGroup}>
                        <Text
                            style={{
                                top: 5,
                                fontSize: 12,
                                color: '#A4AEB4'
                            }}
                        >About</Text>
                        <TextInput
                            class="textarea"
                            placeholder="Name"
                            placeholderTextColor="#A4AEB4"
                            numberOfLines="4"
                            value={about}
                            multiline="true"
                            onChangeText={aboutInput}
                            style={{
                                height: windowHeight / 7,
                                color: '#A4AEB4',
                                borderColor: 'rgba(164, 174, 180, 0.4)',
                            }}
                        />
                    </View>
                    <Text style={style.apierrorText}>{ apiErrorText }</Text>
                    <Text style={style.apidoneText}>{ apiDoneText }</Text>
                    <PrimaryBtn text="Save" handlePress={submite}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </>
    )
}
