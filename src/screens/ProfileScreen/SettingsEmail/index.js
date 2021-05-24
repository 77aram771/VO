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



export const SettingsEmail = () => {

    const {openSettingsEmail} = useContext(Context)
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setEmail(text)
        if (reg.test(text) === false) {
            setErrorEmail(true)
            setFocusEmail(false)
            return false;
        }
        else {
            setErrorEmail(false)
            setFocusEmail(true)
        }
    }

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
                            width: (windowWidth * 80 ) / 100 - 40,
                            paddingLeft: 30,
                            flexDirection: 'row',
                            height: (windowHeight * 10) / 100,
                            paddingTop: 20,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => openSettingsEmail()}
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
                        >Email Address</Text>
                    </View>
                    <View
                        style={{
                            width: (windowHeight * 20) / 100,
                            justifyContent: 'center',
                            height: (windowHeight * 10) / 100,
                            alignItems: 'center',
                            paddingTop: 20,
                            paddingRight: 10
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                position: 'relative',
                                width: '50%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: 'blue',
                                borderRadius: 100,
                                overflow: 'hidden',
                                height: (windowHeight * 4 ) / 100
                            }}
                        >
                            <LinearGradient
                                colors={['#2727F5', '#001671']}
                                start={[0.0, 0.5]}
                                end={[1.0, 0.5]}
                                style={{
                                    position: 'absolute',
                                    width: windowWidth,
                                    height: (windowHeight * 7 ) / 100,
                                }}
                            />
                            <Text style={{
                                fontSize: 17,
                                color: 'white',
                            }}>Save</Text>
                        </TouchableOpacity>
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
                    <View style={style.form}>
                        <View style={style.formGroup}>
                            {focusEmail && (
                                <Image
                                    style={style.focusBlured}
                                    source={require('../../../assets/images/backgrounds/focus-blured.png')}
                                />
                            )}
                            {errorEmail && (
                                <Image
                                    style={style.errorBlured}
                                    source={require('../../../assets/images/backgrounds/error-blured.png')}
                                />
                            )}
                            <TextInput
                                style={style.input}
                                placeholder="Email"
                                placeholderTextColor="#A4AEB4"
                                onChangeText={validate}
                                onFocus={() => {setFocusEmail(true);setErrorEmail(false)}}
                                onBlur={() => {setFocusEmail(false)}}
                            />
                            {errorEmail && (
                                <Text style={style.errorText}>{emailErrorText}</Text>
                            )}
                        </View>
                        <Text style={style.apierrorText}>{apiErrorText}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
