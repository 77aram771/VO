import React, {useState, useRef, useContext} from "react"
import {
    Keyboard,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback, TextInput, ImageBackground
} from "react-native";
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn";



export const SettingsDelete = () => {

    const {openSettingsDelete} = useContext(Context)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [email, setEmail] = useState('admin@vo.com')
    const [errorLogin, setErrorLogin] = useState(false)
    const [focusLogin, setFocusLogin] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [removed, setRemoved] = useState(true)
    const [verify, setVerify] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const remove = () => {

    }

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setEmail(text)
        if (reg.test(text) === false) {
            setEmailError(true)
            setErrorLogin(true)
            setFocusLogin(false)
            return false;
        } else {
            setEmailError(false)
            setErrorLogin(false)
            setFocusLogin(true)
        }
    }

    const goTologin = () => {

    }

    const goToRegister = () => {

    }

    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View>
            {!removed && (
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
                            <TouchableOpacity onPress={() => openSettingsDelete()}
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
                            >Delete Account</Text>
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
                        {verify && (
                            <View style={[style.form, {
                                paddingTop: (windowHeight * 20) /100
                            }]}>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    You have to verify your email address that used for registration to delete your account
                                </Text>
                                <View style={style.formGroup}>
                                    {focusLogin && (
                                        <Image
                                            style={style.focusBlured}
                                            source={require('../../../assets/images/backgrounds/focus-blured.png')}
                                        />
                                    )}
                                    {errorLogin && (
                                        <Image
                                            style={style.errorBlured}
                                            source={require('../../../assets/images/backgrounds/error-blured.png')}
                                        />
                                    )}
                                    <TextInput
                                        style={style.input}
                                        placeholder="Email"
                                        placeholderTextColor="#A4AEB4"
                                        onFocus={() => {setFocusLogin(true);setErrorLogin(false)}}
                                        onBlur={() => {setFocusLogin(false)}}
                                        onChangeText={validate}
                                        keyboardType="email-address"
                                    />
                                    {errorLogin && (
                                        <Text style={style.errorText}>{emailErrorText}</Text>
                                    )}
                                </View>
                                <Text style={style.apierrorText}>{apiErrorText}</Text>
                                <PrimaryBtn text="Verify" handlePress={remove}/>
                            </View>
                        )}
                        {confirmDelete && (
                            <View style={[style.form, {
                                paddingTop: (windowHeight * 20) /100
                            }]}>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    By deleting your account you won’t be able to use VO app and you need to re-register to app
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'blue',
                                        borderRadius: 100,
                                        overflow: 'hidden',
                                        height: (windowHeight * 7 ) / 100,
                                        marginTop: (windowHeight * 40 ) / 100,
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#F40505', '#A30019']}
                                        start={[0.0, 0.5]}
                                        end={[1.0, 0.5]}
                                        style={{
                                            position: 'absolute',
                                            width: windowWidth,
                                            height: (windowHeight * 7 ) / 100,
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: 20,
                                        color: 'white',
                                    }}>Delete Account</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            )}
            {removed && (
                <View style={style.loginContainer}>
                    <Image
                        style={style.background}
                        source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
                    />
                    <View style={style.loginContent}>
                        <Text style={style.title}>Goodbye see you soon</Text>
                        <Text style={{
                            fontSize: 20,
                            color: '#FFFFFF',
                            marginTop: windowHeight / 10,
                            marginBottom: windowHeight / 10,
                        }}>We will miss you!</Text>
                        <PrimaryBtn text="Login" handlePress={goTologin}/>
                        <TouchableOpacity
                            style={style.borderedBtn}
                            onPress={goToRegister}
                        >
                            <Text style={style.greyText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            </View>
        </TouchableWithoutFeedback>
    )
}
