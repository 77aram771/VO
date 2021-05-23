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
import {WatchedVideo} from "../../../components/UI/WatchedVideos"

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



export const WatchedVideos = ({navigation}) => {

    const [apiErrorText, setApiErrorText] = useState('')
    const top = useRef(new Animated.Value(-300)).current
    const animatedTop = useRef(new Animated.Value(-100)).current
    const animateItem = useRef(new Animated.Value(0)).current
    const [popup, setPopup] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [devicePlatform, setDevicePlatform] = useState(Platform.OS)
    const [data, setData] = useState(DATA)

    const {watchedVideosModalVisible} = useContext(Context)
    const {openWatchedVideos} = useContext(Context)


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
            easingWatchedVideo: Easing.linear,
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
                        <TouchableOpacity onPress={() => openWatchedVideos()}
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
                        >Watched Videos</Text>
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
                        renderItem={({ item, index }) => (<WatchedVideo item={item} parentMoreClick={handlePopup} />)}
                    />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}
