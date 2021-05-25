import React, {useState, useRef, useContext} from "react"
import {
    ActivityIndicator,
    Keyboard,
    styleheet,
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
    ScrollView
} from "react-native";
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";
import {MyVideo} from "../../../components/UI/MyVideo"

const DATA = [
    {
        id: "1",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "1Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "2",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "3",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "3Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "4",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "5",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "5Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "6",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "7",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "8",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "9",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "10",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
    {
        id: "11",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
        duration: "50:40",
        name: "Netflix posted a new video:",
        desc:
            "When a young boy vanishes, a town uncovers a mystery involving secret…",
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        author: "John Doe",
        views: "32",
    },
]



export const MyVideos = ({navigation}) => {

    const [apiErrorText, setApiErrorText] = useState('')
    const top = useRef(new Animated.Value(-300)).current
    const animatedTop = useRef(new Animated.Value(-100)).current
    const animateItem = useRef(new Animated.Value(0)).current
    const [popup, setPopup] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [devicePlatform, setDevicePlatform] = useState(Platform.OS)
    const [data, setData] = useState(DATA)

    const {myVideosModalVisible} = useContext(Context)
    const {openMyVideos} = useContext(Context)


    const dismiseKey = () => {
        Keyboard.dismiss();
        Animated.timing(top, {
            toValue: -300,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
        Animated.timing(animateItem, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
        Animated.timing(animatedTop, {
            toValue: -100,
            duration: 1,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
        setPopup(false)
    };

    const closePopup = () => {
        Animated.timing(animateItem, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
        Animated.timing(animatedTop, {
            toValue: -100,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
        setPopup(false)
        Animated.timing(top, {
            toValue: -300,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
    }

    const handlePopup = (data) => {
        // console.log(data);
        setSelectedItem(DATA[data.item - 1])
        // console.log(selectedItem);
        if (data.popup == true) {
            Animated.timing(top, {
                toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {});
            Animated.timing(animateItem, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {});
            Animated.timing(animatedTop, {
                toValue: windowHeight / 2 - 90,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {});
            setPopup(true)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>

                <Animated.View
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
                        bottom: top,
                        zIndex: 999
                    }}

                >
                    <TouchableOpacity >
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
                                    source={require('../../../assets/images/icons/share.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 15,
                                        height: 15,
                                    }}
                                />
                            </View>
                            <Text style={style.greyText}>Share</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
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
                                    source={require('../../../assets/images/icons/edit.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 15
                                    }}
                                />
                            </View>
                            <Text style={style.greyText}>Edit Video/info</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
                                    source={require('../../../assets/images/icons/trash.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 15
                                    }}
                                />
                            </View>
                            <Text style={style.greyText}>Delete Video</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
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
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: windowWidth,
                        paddingTop: 10,
                        height: (windowHeight * 10) / 100,
                        opacity: 1,
                        flexDirection: 'row',
                        zIndex: 999
                    }}
                >
                    <BlurView
                        intensity="80"
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: windowWidth,
                            height: (windowHeight * 10) / 100,
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
                            height: (windowHeight * 10) / 100,
                            paddingTop: 20,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => openMyVideos()}
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
                        >My Videos</Text>
                    </View>
                </View>
                <ScrollView
                    content-container-style={{
                        contentContainer: {
                            flex:1,
                        },
                    }}
                    style={{
                        paddingTop: (windowHeight * 10) / 100,
                    }}
                >
                    <FlatList
                        data={DATA}
                        numColumns=""
                        vertical="true"
                        style={{
                            width: windowWidth,
                            paddingBottom: (windowHeight * 5) / 100 + windowHeight / 20,

                        }}
                        renderItem={({ item, index }) => (<MyVideo item={item} parentMoreClick={handlePopup} />)}
                    />
                </ScrollView>

                <Animated.View
                    style={{
                        flexDirection: 'row',
                        paddingLeft: 15,
                        paddingRight: 15,
                        left: 0,
                        paddingTop:10,
                        paddingBottom: 10,
                        white: windowWidth - 30,
                        backgroundColor: '#010117',
                        position: 'absolute',
                        zIndex: 2,
                        top: animatedTop,
                        opacity: animateItem
                    }}
                >
                    <View
                        style={{
                            width: (windowWidth * 40 ) / 100 - 10,
                            height: 90,
                            marginRight: 10
                        }}>
                        <Image
                            resizeMode="contain"
                            style={{
                                width: (windowWidth * 40 ) / 100 - 10,
                                height: 90,
                            }}
                            source={require('../../../assets/images/notification-video-img.png')}
                        />
                        <View style={style.duration}>
                            <Text style={style.text}>{selectedItem.duration}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            width: (windowWidth * 60 ) / 100,
                            height: 90
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#DEDEDE',
                                marginBottom: 5,
                                width: (windowWidth * 60 ) / 100 - 80
                            }} numberOfLines="1" ellipsizeMode='tail'>{selectedItem.name}</Text>
                        <Text style={style.desc} numberOfLines="2" ellipsizeMode='tail'>{selectedItem.desc}</Text>
                        <View style={style.authorInfo}>
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: (windowWidth * 5 ) / 100,
                                    height: 20,
                                    borderWidth: 0.5,
                                    borderColor: '#5D5D67',
                                    borderRadius: 100,
                                    marginRight: 10
                                }}
                                source={require('../../../assets/images/notification-pick.png')}
                            />
                            <Text style={style.author}>{selectedItem.author}</Text>
                            <View style={style.dot}></View>
                            <Text style={style.views}>{selectedItem.views}K Views</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={closePopup}>
                        <View style={style.more}>
                            <View style={style.moreDots}></View>
                            <View style={style.moreDots}></View>
                            <View style={style.moreDots}></View>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                {popup && (
                    <BlurView
                        intensity="50"
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: windowWidth,
                            height: windowHeight,
                            zIndex: 1
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#000',
                                position: 'absolute',
                                top: 0,
                                opacity: 0.8,
                                width: windowWidth,
                                height: windowHeight,
                                zIndex: 2
                            }}
                        >

                        </View>
                    </BlurView>
                )}

            </View>
        </TouchableWithoutFeedback>
    )
}
