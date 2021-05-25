import React, {useState, useRef, useContext} from "react"
import {
    Keyboard,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback, TextInput, ImageBackground, AsyncStorage
} from "react-native";
import {API_URL, windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn";
import axios from "axios";



export const SettingsDelete = ({navigation}) => {

    const {openSettingsDelete} = useContext(Context)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [email, setEmail] = useState('admin@vo.com')
    const [errorLogin, setErrorLogin] = useState(false)
    const [focusLogin, setFocusLogin] = useState(false)
    const [emailError, setEmailError] = useState(true)
    const [removed, setRemoved] = useState(false)
    const [verify, setVerify] = useState(true)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const {user} = useContext(Context)
    const {setLogout} = useContext(Context)

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

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

    const verifyEmail = () => {
        if (emailError === true) {
            setErrorLogin(true)
            setEmailErrorText("Incorrect Email Format")
            return;
        }
        setErrorLogin(false)
        if (!email) {
            setErrorLogin(true)
            setEmailErrorText("Incorrect Email Address")
            return;
        }
        setErrorLogin(false)
        if (email.toLowerCase() === user.email) {
            setEmailError(false)
            setApiErrorText('')
            setVerify(false)
            setConfirmDelete(true)
        } else {
            setEmailError(true)
            setApiErrorText('You email address does not matched')
        }
    }

    const deleteAccount = async () => {
        try {
            await axios
                .delete(`${API_URL}/api/User?id=${user.id}`)
                .then((response) => {
                    console.log(response)
                    if (response.data.accepted == false) {
                        setApiErrorText(response.data.errorMessages[0])
                        console.log(apiErrorText)
                    } else if (response.data.accepted == true) {
                        setRemoved(true)
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

    const goTologin = async () => {
        try {
            await AsyncStorage.removeItem('Token');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('user');
            setLogout()
        }
        catch(exception) {
            return false;
        }
    }

    const goToRegister = async () => {
        try {
            await AsyncStorage.removeItem('Token');
            await AsyncStorage.removeItem('refreshToken');
            await AsyncStorage.removeItem('user');
            setLogout()
            navigation.navigate('RegisterScreen')
        }
        catch(exception) {
            return false;
        }
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
                                <PrimaryBtn text="Verify" handlePress={verifyEmail}/>
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
                                    onPress={deleteAccount}
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
