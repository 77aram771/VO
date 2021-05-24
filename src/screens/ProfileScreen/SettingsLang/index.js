import React, {useState, useRef, useContext} from "react"
import {
    Keyboard,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";



export const SettingsLang = () => {

    const {openSettingsLang} = useContext(Context)
    const [lang, setLang] = useState('en')


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
                        <TouchableOpacity onPress={() => openSettingsLang()}
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
                        >Language</Text>
                    </View>
                </View>
                <View
                    style={{
                        paddingTop: (windowHeight * 10) / 100,
                    }}
                >
                    <TouchableOpacity>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                textAlign: 'left',
                                paddingTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                  }}
                            >English</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 10,
                                }}
                            >
                                {lang == 'en' && (
                                    <Image
                                        source={require('../../../assets/images/icons/checked.png')}
                                        resizeMode="contain"
                                        style={{
                                            height: 13,
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                textAlign: 'left',
                                paddingTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >عربی</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 10,
                                }}
                            >
                                {lang == 'ar' && (
                                    <Image
                                        source={require('../../../assets/images/icons/checked.png')}
                                        resizeMode="contain"
                                        style={{
                                            height: 13,
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
