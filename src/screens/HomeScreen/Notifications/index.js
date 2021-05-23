import React, {useState, useEffect, useContext} from "react";
import {
    ActivityIndicator,
    Keyboard,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    FlatList,
    ImageBackground,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {windowHeight, windowWidth} from "../../../shared/Const";
import {DefaultHeader} from "../../../components/UI/DefaultHeader";
import {style} from "./style";
import Context from "../../../../Context";

const DATA = [
    {
        id: "1",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "2",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "3",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "4",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "5",
        is_new: false,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "6",
        is_new: false,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "7",
        is_new: false,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "8",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "9",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "10",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "11",
        is_new: false,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "12",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "13",
        is_new: false,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "14",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "15",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "16",
        is_new: false,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
    {
        id: "17",
        is_new: true,
        profile:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-pick.png",
        video: "Stranger Things - New episode",
        name: "Netflix posted a new video:",
        image:
            "file:///Users/tikhak/Vecto%20Projects/VO/mobile-ui/assets/images/notification-video-img.png",
    },
];

export const Notifications = ({navigation}) => {
    const [apiErrorText, setApiErrorText] = useState("");
    const [data, setData] = useState(DATA);

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const {openNotifications} = useContext(Context)

    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={[style.container,{
                paddingTop: 40
            }]}>
                {/* <ActivityIndicator
          style={style.loader}
          animating={load}
          textContent="Loading..."
          size="small"
          color="#ffffff"
        /> */}
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
                        height: 50,
                        opacity: 0.6,
                        flexDirection: 'row',
                    }}
                >
                    {/* <BlurView
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
                </BlurView> */}


                    <View
                        style={{
                            width: windowWidth,
                            paddingLeft: 10,
                            flexDirection: 'row',
                            height: 50,
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity onPress={() => openNotifications()}>
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
                        >Notifications</Text>
                    </View>

                </View>
                <ScrollView
                    contentContainerStyle={
                        style.scrollView}
                >
                    <FlatList
                        data={DATA}
                        numColumns=""
                        vertical="true"
                        style={{
                            width: windowWidth,
                        }}
                        renderItem={({item, index}) => (
                            <TouchableOpacity
                                render-prop-fn="renderItem"
                                style={[
                                    item.is_new == true
                                        ? {
                                            width: windowWidth,
                                            overflow: "hidden",
                                            flexDirection: "row",
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            backgroundColor: "#0E0E31",
                                        }
                                        : {
                                            width: windowWidth,
                                            overflow: "hidden",
                                            flexDirection: "row",
                                            paddingLeft: 15,
                                            paddingRight: 15,
                                            paddingTop: 10,
                                            paddingBottom: 10,
                                            backgroundColor: "#010117",
                                        },
                                ]}
                            >
                                <View
                                    style={{
                                        width: (windowWidth * 15) / 100,
                                    }}
                                >
                                    <Image
                                        source={{uri: item.profile}}
                                        resizeMode="contain"
                                        style={{
                                            width: (windowWidth * 10) / 100,
                                            height: 40,
                                            borderWidth: 0.5,
                                            borderColor: "#5D5D67",
                                            borderRadius: 100,
                                        }}
                                    ></Image>
                                </View>
                                <View
                                    style={{
                                        width: (windowWidth * 50) / 100,
                                        height: 35,
                                    }}
                                >
                                    <Text
                                        style={[
                                            item.is_new == true
                                                ? {
                                                    color: "#A4AEB4",
                                                    fontSize: 14,
                                                }
                                                : {
                                                    color: "#FFFFFF",
                                                    fontSize: 14,
                                                },
                                        ]}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#FFFFFF",
                                            fontSize: 15,
                                            fontWeight: "700",
                                        }}
                                    >
                                        {item.video}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        width: (windowWidth * 25) / 100,
                                        height: 35,
                                    }}
                                >
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            width: (windowWidth * 30) / 100,
                                            height: 40,
                                        }}
                                        source={{uri: item.image}}
                                    ></Image>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};
