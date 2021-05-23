import React, {useState, useRef, useContext} from "react"
import {
    Keyboard,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback, TextInput
} from "react-native";
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn";



export const SettingsAbout = () => {

    const {openSettingsAbout} = useContext(Context)

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                <LinearGradient
                    colors={["#181880", "#010106", "#010106", "#000000"]}
                    location={[0, 0.1, 0.2, 1]}
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
                        <TouchableOpacity onPress={() => openSettingsAbout()}
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
                        >About app</Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: 'black',
                        width: '100%',
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <LinearGradient
                        colors={["#181880", "#010106", "#010106", "#000000"]}
                        location={[0, 0.1, 0.2, 1]}
                        style={{
                            position: "absolute",
                            width: windowWidth,
                            height: windowHeight,
                        }}
                    />
                    <View style={[style.form, {
                       paddingTop: (windowHeight * 20) /100
                    }]}>
                            <Image
                                source={require('../../../assets/images/logo.png')}
                                resizeMode="contain"
                                style={{
                                    height: (windowWidth * 15) / 100,
                                    marginBottom: 30
                                }}
                            />
                            <Text style={{
                                fontSize: 16,
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                Lorem ipsum dolor sit amet, tale falli euismod vix an, per hinc harum commune in. Cu vix wisi everti explicari, id his meis ancillae consulatu, hinc euismod te vis.
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#90949F',
                                textAlign: 'center',
                                marginTop: (windowHeight * 20) /100
                            }}>follow us @voapp</Text>
                            <View style={style.socialIcons}>
                                <TouchableWithoutFeedback style={style.facebook}>
                                    <Image
                                        style={style.checkedImg}
                                        resizeMode="contain"
                                        source={require('../../../assets/images/icons/fb-gray.png')}
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback style={style.apple} >
                                    <Image
                                        style={style.checkedImg}
                                        resizeMode="contain"
                                        source={require('../../../assets/images/icons/twiter-gray.png')}
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback style={style.google} >
                                    <Image
                                        style={style.checkedImg}
                                        resizeMode="contain"
                                        source={require('../../../assets/images/icons/youtube-gray.png')}
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback style={style.google} >
                                    <Image
                                        style={style.checkedImg}
                                        resizeMode="contain"
                                        source={require('../../../assets/images/icons/instagram-gray.png')}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        <Text style={{
                            fontSize: 16,
                            color: '#90949F',
                            textAlign: 'center',
                            marginTop: (windowHeight * 10) /100
                        }}>© 2020 VOApp. All Rights Reserved.</Text>

                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
