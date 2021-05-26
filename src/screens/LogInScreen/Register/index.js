import React, {useState} from "react";
import {
    ActivityIndicator,
    Keyboard,
    Text,
    View,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    AsyncStorage, TouchableOpacity, ImageBackground
} from "react-native"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import {ExternalLogin} from "../../../components/ExternalLogin"
// import {CheckBox} from " ../../../components/UI/CheckBox"
import {style} from './style'
import axios from "axios";
import {API_URL, FB_APP_ID, IOS_GOOGLE_ID, windowHeight, windowWidth} from "../../../shared/Const";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";

export const Register = ({navigation}) => {

    const [passwordType, setPasswordType] = useState(true)
    const [cpasswordType, setCPasswordType] = useState(true)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [passErrorText, setPassErrorText] = useState('')
    const [cpassErrorText, setCpassErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [emailError, setEmailError] = useState(true)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false)
    const [focusLogin, setFocusLogin] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [focusPass, setFocusPass] = useState(false)
    const [errorCPass, setErrorCPass] = useState(false)
    const [focusCPass, setFocusCPass] = useState(false)
    const [terms, setTerms] = useState(false);
    const [load, setLoad] = useState(false);

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const changeTerms = () => {
        setTerms(!terms)
        console.log(terms)
    }

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        setEmail(text)
        if (reg.test(text) === false) {
            setEmailError(true)
            setErrorLogin(true)
            setFocusLogin(false)
            return false;
        }
        else {
            setEmailError(false)
            setErrorLogin(false)
            setFocusLogin(true)
        }
    }

    const handleCheckBox = () => {
        setState({ termsAccepted: !this.state.termsAccepted })
    }

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

    const onChangePass = (val) => {
        setPassword(val)
    }

    const onChangeCPass = (val) => {
        setCpassword(val)
    }

    const register = async () => {
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
        if (!password) {
            setErrorPassword(true)
            setPassErrorText('Incorrect Password')
            return;
        }
        setErrorPassword(false)
        if (password.length < 8) {
            setErrorPass(true)
            setPassErrorText("The password must be min 8 ");
            return;
        }
        setErrorPass(false)
        if (password.search(/\d/) == -1) {
            setErrorPass(true)
            setPassErrorText("the password must contain at least one alphabetic character and at least one numeric character");
            return;
        }
        setErrorPass(false)
        if (password.search(/[a-zA-Z]/) == -1) {
            setErrorPass(true)
            setPassErrorText("the password must contain at least one alphabetic character and at least one numeric character")
            return;
        }
        setErrorPass(false)
        if (!cpassword) {
            setErrorCPass(true)
            setCpassErrorText("Incorrect Password");
            return;
        }
        setErrorCPass(false)
        if (cpassword != password) {
            setErrorCPass(true)
            setCpassErrorText("The Repeat password must be same password")
            return;
        }
        setErrorCPass(false)
        let data = {
            email: email
        };
        setLoad(true)
        try {
            await axios
                .post(`${API_URL}/api/Account/SignUpConfirmation`, data)
                .then((response) => {
                    console.log(response)
                    setLoad(false)
                    if (response.data.accepted == false) {
                        setApiErrorText(response.data.errorMessages[0])
                        console.log(apiErrorText)
                    } else if (response.data.accepted == true) {
                        navigation.navigate("ConfirmRegScreen", {
                            emailAddress: email,
                            userPassword: password,
                        });
                    } else {
                        setApiErrorText("Something went wrong. Please try again.")
                    }
                })
                .catch((error) => {
                    setLoad(false)
                    console.log(error)
                })
        } catch (e) {
            setLoad(false)
            console.log(e)
        }
    }


    const getUser = async (token) => {

        await axios
            .get(`${API_URL}/api/User`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + token,
                }
            })
            .then((response) => {
                // console.log('res-', response.data)
                if (response.data.accepted == false) {
                    setApiErrorText(response.data.errorMessages[0])
                } else if (response.data.accepted == true) {
                    const user = response.data.data[0]
                    (async () => {
                        await AsyncStorage.setItem('user', JSON.stringify(user))
                    })()
                    setApiErrorText('')
                } else {
                    setApiErrorText("Something went wrong. Please try again.")
                }
            })
            .catch((error) => {
                console.log(error)
                setApiErrorText("Something went wrong. Please try again.")
            })
    }
    const goBack = () => {
        navigation.goBack()
    }
    const externalLogin = (type) => {
        setLoad(true)
        if (type === 'facebook') {
            fbSignIn()
        } else if (type === 'apple') {
            authApple()
        } else if (type === 'google') {
            authGoogle()
        } else {
            setLoad(false)
            setApiErrorText('Something went wrong. Please try again.')
        }
    }

    const fbSignIn = () => {
        signInWithFacebookAsync()
            .then((res) => {
                setLoad(false)
                if (res) {
                    let data = {
                        provider: "Google",
                        providerUserId: res.user.id,
                        email: res.email,
                        device: {
                            deviceId: "string",
                            deviceType: 1,
                            model: "string",
                            os: "string",
                            ip: "string",
                            appVersion: "string"
                        },
                    };

                    axios.post(`${API_URL}/api/Account/External/SignIn`, data)
                        .then((response) => {
                            console.log('res-', response)
                            if (response.data.accepted == false) {
                                if (
                                    !res.email ||
                                    !res.first_name ||
                                    !res.last_name ||
                                    !res.gender ||
                                    !res.birthDate
                                ) {
                                    console.log('missing', res)
                                    navigation.navigate("MissingContScreen", {
                                        provider: "Facebook",
                                        providerUserId: res.id,
                                        socialEmail: res.email,
                                        socialFirstName: res.first_name,
                                        socialLastName: res.last_name,
                                        socialGender: res.gender,
                                        socialBirthDate: res.birthDate,
                                    });
                                } else {
                                    let data = {
                                        provider: "Facebook",
                                        providerUserId: res.id,
                                        email: res.email,
                                        firstName: res.first_name,
                                        lastName: res.last_name,
                                        gender: res.gender,
                                        birthDate: res.birthDate,
                                        device: {
                                            deviceId: "string",
                                            deviceType: 1,
                                            model: "string",
                                            os: "string",
                                            ip: "string",
                                            appVersion: "string"
                                        },
                                    };
                                    console.log(data);
                                    axios
                                        .post(`${API_URL}/api/Account/External/SignUp`, data)
                                        .then((response) => {
                                            console.log('res-', response)
                                            if (response.data.accepted == false) {
                                                setApiErrorText(response.data.errorMessages[0])
                                            } else if (response.data.accepted == true) {
                                                const Token = response.data.data[0].accessToken
                                                AsyncStorage.setItem('Token', Token)
                                                getUser(Token)
                                                setLogin()
                                                setApiErrorText('')
                                            } else {
                                                setApiErrorText("Something went wrong. Please try again.")
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                            setApiErrorText("Something went wrong. Please try again.")
                                        })
                                }
                            } else if (response.data.accepted == true) {
                                console.log('true')
                                const Token = response.data.data[0].accessToken
                                AsyncStorage.setItem('Token', Token)
                                getUser(Token)
                                setLogin()
                            } else {
                                console.log('else')
                                // setApiErrorText("Something went wrong. Please try again.")
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            // setApiErrorText("Something went wrong. Please try again.")
                        })
                }
            })
            .catch((err) => {
                setLoad(false)
                console.log(err);
            });
    }
    async function signInWithFacebookAsync() {
        // try {
        await Facebook.initializeAsync(FB_APP_ID);
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync({
            permissions: [
                "public_profile",
                "email",
                "user_gender",
                "user_birthday",
            ],
        });
        console.log(type)
        switch (type) {
            case "success": {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}&fields=id,email,first_name,last_name,name,gender,picture.type(large)`
                );
                const result = await response.json();
                return result;
                break;
            }
            case "cancel": {
                return false;
                break;
            }
            default: {
                return false;
            }
        }
        // } catch (e) {
        //     return false;
        // }
    }

    const authGoogle = async () => {
        signInWithGoogleAsync()
            .then((res) => {
                setLoad(false)
                if (res) {
                    let data = {
                        provider: "Google",
                        providerUserId: res.user.id,
                        email: res.user.email,
                        device: {
                            deviceId: "string",
                            deviceType: 1,
                            model: "string",
                            os: "string",
                            ip: "string",
                            appVersion: "string"
                        },
                    };

                    axios.post(`${API_URL}/api/Account/External/SignIn`, data)
                        .then((response) => {
                            console.log('res-', response)
                            if (response.data.accepted == false) {
                                if (
                                    !res.user.email ||
                                    !res.user.givenName ||
                                    !res.user.familyName ||
                                    !res.user.gender ||
                                    !res.user.birthDate
                                ) {
                                    console.log('missing', res)
                                    navigation.navigate("MissingContScreen", {
                                        provider: "Google",
                                        providerUserId: res.user.id,
                                        socialEmail: res.user.email,
                                        socialFirstName: res.user.givenName,
                                        socialLastName: res.user.familyName,
                                        socialGender: res.user.gender,
                                        socialBirthDate: res.user.birthDate,
                                    });
                                } else {
                                    let data = {
                                        provider: "Google",
                                        providerUserId: res.user.id,
                                        email: res.user.email,
                                        firstName: res.user.givenName,
                                        lastName: res.user.familyName,
                                        gender: res.user.gender,
                                        birthDate: res.user.birthDate,
                                        device: {
                                            deviceId: "string",
                                            deviceType: 1,
                                            model: "string",
                                            os: "string",
                                            ip: "string",
                                            appVersion: "string"
                                        },
                                    };
                                    console.log(data);
                                    axios
                                        .post(`${API_URL}/api/Account/External/SignUp`, data)
                                        .then((response) => {
                                            console.log('res-', response)
                                            if (response.data.accepted == false) {
                                                setApiErrorText(response.data.errorMessages[0])
                                            } else if (response.data.accepted == true) {
                                                const Token = response.data.data[0].accessToken
                                                AsyncStorage.setItem('Token', Token)
                                                getUser(Token)
                                                setLogin()
                                                setApiErrorText('')
                                            } else {
                                                setApiErrorText("Something went wrong. Please try again.")
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                            setApiErrorText("Something went wrong. Please try again.")
                                        })
                                }
                            } else if (response.data.accepted == true) {
                                console.log('true')
                                const Token = response.data.data[0].accessToken
                                AsyncStorage.setItem('Token', Token)
                                getUser(Token)
                                setLogin()
                            } else {
                                console.log('else')
                                // setApiErrorText("Something went wrong. Please try again.")
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            // setApiErrorText("Something went wrong. Please try again.")
                        })
                }
            })
            .catch((err) => {
                setLoad(false)
                console.log(err);
            });
    }
    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                behavior: "web",
                iosClientId: IOS_GOOGLE_ID,
                //androidClientId: AND_CLIENT_ID,
                scopes: [
                    "profile",
                    "email",
                    "https://www.googleapis.com/auth/user.gender.read",
                    "https://www.googleapis.com/auth/user.birthday.read",
                ],
            });

            if (result.type === "success") {
                return result;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    const authApple = () => {
        signInWithAppleAsync()
            .then((res) => {
                setLoad(false)
                if (res) {
                    let data = {
                        provider: "Google",
                        providerUserId: res.user.id,
                        email: res.email,
                        device: {
                            deviceId: "string",
                            deviceType: 1,
                            model: "string",
                            os: "string",
                            ip: "string",
                            appVersion: "string"
                        },
                    };

                    axios.post(`${API_URL}/api/Account/External/SignIn`, data)
                        .then((response) => {
                            console.log('res-', response)
                            if (response.data.accepted == false) {
                                if (
                                    !res.email ||
                                    !res.fullName.givenName ||
                                    !res.fullName.familyName ||
                                    !res.fullName.gender ||
                                    !res.fullName.birthDate
                                ) {
                                    console.log('missing', res)
                                    navigation.navigate("MissingContScreen", {
                                        provider: "Apple",
                                        providerUserId: res.authorizationCode,
                                        socialEmail: res.email,
                                        socialFirstName: res.fullName.givenName,
                                        socialLastName: res.fullName.familyName,
                                        socialGender: res.fullName.gender,
                                        socialBirthDate: res.fullName.birthDate,
                                    });
                                } else {
                                    let data = {
                                        provider: "Apple",
                                        providerUserId: res.id,
                                        email: res.email,
                                        firstName: res.first_name,
                                        lastName: res.last_name,
                                        gender: res.gender,
                                        birthDate: res.birthDate,
                                        device: {
                                            deviceId: "string",
                                            deviceType: 1,
                                            model: "string",
                                            os: "string",
                                            ip: "string",
                                            appVersion: "string"
                                        },
                                    };
                                    console.log(data);
                                    axios
                                        .post(`${API_URL}/api/Account/External/SignUp`, data)
                                        .then((response) => {
                                            console.log('res-', response)
                                            if (response.data.accepted == false) {
                                                setApiErrorText(response.data.errorMessages[0])
                                            } else if (response.data.accepted == true) {
                                                const Token = response.data.data[0].accessToken
                                                AsyncStorage.setItem('Token', Token)
                                                getUser(Token)
                                                setLogin()
                                                setApiErrorText('')
                                            } else {
                                                setApiErrorText("Something went wrong. Please try again.")
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                            setApiErrorText("Something went wrong. Please try again.")
                                        })
                                }
                            } else if (response.data.accepted == true) {
                                console.log('true')
                                const Token = response.data.data[0].accessToken
                                AsyncStorage.setItem('Token', Token)
                                getUser(Token)
                                setLogin()
                            } else {
                                console.log('else')
                                // setApiErrorText("Something went wrong. Please try again.")
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            // setApiErrorText("Something went wrong. Please try again.")
                        })
                }
            })
            .catch((err) => {
                setLoad(false)
                console.log(err);
            });
    }
    async function signInWithAppleAsync() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            if (credential) {
                return credential;
            }
        } catch (e) {
            if (e.code === "ERR_CANCELED") {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
    }

    return (
        <ImageBackground
            style={{

                flex: 1
            }}
            resizeMode={"cover"}
            imageStyle={{
                resizeMode: 'cover',
                position: 'absolute',
                bottom: '-15%',
            }}
            source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
        >
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                {load && (
                    <ActivityIndicator
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: 'auto',
                            height: '100%',
                            zIndex: 9999,
                        }}
                        animating={load}
                        textContent="Loading..."
                        size="small"
                        color="#ffffff"
                    />
                )}
                <Image
                    style={style.background}
                    source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
                />
                <View
                    style={{
                        width: windowWidth,
                        position: 'absolute',
                        paddingLeft: 10,
                        height: (windowHeight * 10) / 100,
                        top: (windowHeight * 7) / 100,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start'
                    }}
                >
                    <TouchableOpacity onPress={goBack}
                                      style={{
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
                </View>
                <View style={style.form}>
                    <Text style={style.title}>Register</Text>
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
                        />
                        {errorLogin && (
                            <Text style={style.errorText}>{emailErrorText}</Text>
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
                            placeholder="Password"
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
                            placeholder="Repeat password"
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

                    <PrimaryBtn text="Create account" handlePress={register}/>

                    {/*<CheckBox*/}
                    {/*    selected={terms}*/}
                    {/*    onPress={handleCheckBox}*/}
                    {/*    text='Accept terms and conditions'*/}
                    {/*/>*/}
                    <ExternalLogin handlePress={externalLogin}/>

                </View>
            </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
    )
}
