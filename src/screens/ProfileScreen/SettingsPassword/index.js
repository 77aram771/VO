import React, {useState, useRef, useContext} from "react"
import {
    Keyboard,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback, TextInput, AsyncStorage
} from "react-native";
import {API_URL, windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn";
import axios from "axios";



export const SettingsPassword = () => {

    const {openSettingsPassword} = useContext(Context)
    const [errorPass, setErrorPass] = useState(false)
    const [focusPass, setFocusPass] = useState(false)
    const [errorCuPass, setErrorCuPass] = useState(false)
    const [focusCuPass, setFocusCuPass] = useState(false)
    const [errorCPass, setErrorCPass] = useState(false)
    const [focusCPass, setFocusCPass] = useState(false)
    const [passwordType, setPasswordType] = useState(true)
    const [cpasswordType, setCPasswordType] = useState(true)
    const [cupasswordType, setCuPasswordType] = useState(true)
    const [passErrorText, setPassErrorText] = useState('')
    const [cpassErrorText, setCpassErrorText] = useState('')
    const [cuPassErrorText, setCuPassErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [apiDoneText, setApiDoneText] = useState('')

    const [pass, setPass] = useState('')
    const [cPass, setCPass] = useState('')
    const [cuPass, setCuPass] = useState('')

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const showPass = () => {
        setPasswordType(false)
    }

    const hidePass = () => {
        setPasswordType(true)
    }

    const showCPass = () => {
        setCPasswordType(false)
    }

    const hideCPass = () => {
        setCPasswordType(true)
    }

    const showCuPass = () => {
        setCuPasswordType(false)
    }

    const hideCuPass = () => {
        setCuPasswordType(true)
    }

    const onChangePass = (val) => {
        setPass(val)
    }

    const onChangeCPass = (val) => {
        setCPass(val)
    }

    const onChangeCuPass = (val) => {
        setCuPass(val)
    }

    const changePass = async () => {
        if (!cuPass) {
            setErrorCuPass(true)
            setCuPassErrorText('Incorrect Password')
            return;
        }
        setErrorCuPass(false)
        if (!pass) {
            setErrorPass(true)
            setPassErrorText('Incorrect Password')
            return;
        }
        setErrorPass(false)
        if (pass.length < 8) {
            setErrorPass(true)
            setPassErrorText("The password must be min 8 ");
            return;
        }
        setErrorPass(false)
        if (pass.search(/\d/) == -1) {
            setErrorPass(true)
            setPassErrorText("the password must contain at least one alphabetic character and at least one numeric character");
            return;
        }
        setErrorPass(false)
        if (pass.search(/[a-zA-Z]/) == -1) {
            setErrorPass(true)
            setPassErrorText("the password must contain at least one alphabetic character and at least one numeric character")
            return;
        }
        setErrorPass(false)
        if (!cPass) {
            setErrorCPass(true)
            setCpassErrorText("Incorrect Password");
            return;
        }
        setErrorCPass(false)
        if (cPass != pass) {
            setErrorCPass(true)
            setCpassErrorText("The Repeat password must be same password")
            return;
        }
        setErrorCPass(false)


        try {
            let data = {
                currentPassword: cuPass,
                newPassword: pass
            };
            console.log(data)
            const token = await AsyncStorage.getItem('Token')
            await axios
                .post(`${API_URL}/api/User/ChangePassword`, data)
                .then((response) => {
                    console.log(response)
                    if (response.data.accepted == false) {
                        setApiErrorText(response.data.errorMessages[0])
                        console.log(apiErrorText)
                    } else if (response.data.accepted == true) {
                        console.log(response)
                        // navigation.navigate("ConfirmRegScreen", {
                        //     emailAddress: email,
                        //     userPassword: password,
                        // });
                    } else {
                        setApiErrorText("Something went wrong. Please try again.")
                    }
                })
                .catch((error) => {
                    console.log(error.response)
                    setApiErrorText("Something went wrong. Please try again.")
                })
        } catch (e) {
            console.log(e)
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
                        <TouchableOpacity onPress={() => openSettingsPassword()}
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
                        >Password</Text>
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
                            onPress={changePass}
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
                            {focusCuPass && (
                                <Image
                                    style={style.focusBlured}
                                    source={require('../../../assets/images/backgrounds/focus-blured.png')}
                                />
                            )}
                            {errorCuPass && (
                                <Image
                                    style={style.errorBlured}
                                    source={require('../../../assets/images/backgrounds/error-blured.png')}
                                />
                            )}
                            <TextInput
                                style={style.input}
                                placeholder="Current Password"
                                placeholderTextColor="#A4AEB4"
                                onChangeText={onChangeCuPass}
                                onFocus={() => {setFocusCuPass(true);setErrorPass(false)}}
                                onBlur={() => {setFocusCuPass(false)}}
                                secureTextEntry={cupasswordType}
                            />

                            <TouchableWithoutFeedback
                                onPressIn={showCuPass}
                                onPressOut={hideCuPass}
                            >
                                <Image
                                    style={style.showPass}
                                    source={require('../../../assets/images/icons/show-pass.png')}
                                />
                            </TouchableWithoutFeedback>
                            {errorCuPass && (
                                <Text style={style.errorText}>{cuPassErrorText}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            {focusPass && (
                                <Image
                                    style={style.focusBlured}
                                    source={require('../../../assets/images/backgrounds/focus-blured.png')}
                                />
                            )}
                            {errorPass && (
                                <Image
                                    style={style.errorBlured}
                                    source={require('../../../assets/images/backgrounds/error-blured.png')}
                                />
                            )}
                            <TextInput
                                style={style.input}
                                placeholder="New Password"
                                placeholderTextColor="#A4AEB4"
                                onChangeText={onChangePass}
                                onFocus={() => {setFocusPass(true);setErrorPass(false)}}
                                onBlur={() => {setFocusPass(false)}}
                                secureTextEntry={passwordType}
                            />

                            <TouchableWithoutFeedback
                                onPressIn={showPass}
                                onPressOut={hidePass}
                            >
                                <Image
                                    style={style.showPass}
                                    source={require('../../../assets/images/icons/show-pass.png')}
                                />
                            </TouchableWithoutFeedback>
                            {errorPass && (
                                <Text style={style.errorText}>{passErrorText}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            {focusCPass && (
                                <Image
                                    style={style.focusBlured}
                                    source={require('../../../assets/images/backgrounds/focus-blured.png')}
                                />
                            )}
                            {errorCPass && (
                                <Image
                                    style={style.errorBlured}
                                    source={require('../../../assets/images/backgrounds/error-blured.png')}
                                />
                            )}
                            <TextInput
                                style={style.input}
                                placeholder="Repeat New Password"
                                placeholderTextColor="#A4AEB4"
                                onChangeText={onChangeCPass}
                                onFocus={() => {setFocusCPass(true);setErrorCPass(false)}}
                                onBlur={() => {setFocusCPass(false)}}
                                secureTextEntry={cpasswordType}
                            />

                            <TouchableWithoutFeedback
                                onPressIn={showCPass}
                                onPressOut={hideCPass}
                            >
                                <Image
                                    style={style.showPass}
                                    source={require('../../../assets/images/icons/show-pass.png')}
                                />
                            </TouchableWithoutFeedback>
                            {errorCPass && (
                                <Text style={style.errorText}>{cpassErrorText}</Text>
                            )}
                        </View>
                        <Text style={style.apierrorText}>{apiErrorText}</Text>
                        <Text style={style.apidoneText}>{apiDoneText}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
