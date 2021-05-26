import React, {useState, useEffect, useContext} from "react"
import {
    ActivityIndicator,
    Keyboard,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground, AsyncStorage
} from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import {API_URL, FB_APP_ID, IOS_GOOGLE_ID, windowHeight, windowWidth} from "../../../shared/Const"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import {ExternalLogin} from "../../../components/ExternalLogin"
import {useDispatch, useSelector} from "react-redux"
import {AuthSignIn} from "../../../store/actionsCreators/AuthApiActionCreator";
import {style} from './style'
import Constants from "expo-constants";
import Context from "../../../../Context";
import * as Device from "expo-device";
import * as Facebook from "expo-facebook";
import axios from "axios";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";

export const Login = ({navigation}) => {

    const [passwordType, setPasswordType] = useState(true)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorLogin, setErrorLogin] = useState(false)
    const [focusLogin, setFocusLogin] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [focusPass, setFocusPass] = useState(false)
    const {logIN} = useContext(Context)
    const {setLogin} = useContext(Context)
    const {setUserInfo} = useContext(Context)
    const [load, setLoad] = useState(false)

    const dispatch = useDispatch()
    const data = useSelector((state) => state.AuthReducer.data)
    const loading = useSelector((state) => state.AuthReducer.loading)
    const error = useSelector((state) => state.AuthReducer.error)

    useEffect(() => {
        console.log('navigation', navigation)
    }, [])

    const dismiseKey = () => {
        Keyboard.dismiss()
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

    const showPass = () => {
        setPasswordType(false)
    }

    const hidePass = () => {
        setPasswordType(true)
    }

    const onChangePass = (val) => {
        setPassword(val)
    }

    const goToForgotPass = () => {
        navigation.navigate("ForgotPassScreen")
    }

    const goToRegister = () => {
        navigation.navigate("RegisterScreen")
    }

    const login = async () => {
        if (emailError === true) {
            setFocusLogin(false)
            setErrorLogin(true)
            setEmailErrorText("Incorrect Email Format")
            return;
        }
        if (!email) {
            setErrorLogin(true)
            setEmailErrorText("Incorrect Email Address")
            return;
        }
        setErrorLogin(errorLogin)
        if (!password) {
            setErrorPassword(true)
            return;
        }
        setErrorPassword(false)
        // let data = {
        //     "avatar": "https://sonopax-file-storage.s3.us-west-1.amazonaws.com/user/avatar/7d47a542-bee4-4797-87e6-10abfbf0876d.png?X-Amz-Expires=86400&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVJUHAU5W2ZMIXNZR/20210523/us-west-1/s3/aws4_request&X-Amz-Date=20210523T072438Z&X-Amz-SignedHeaders=host&X-Amz-Signature=5363cebb8c8a5f1c4c243fafe4bd9db0d687154a66fcbc19896d5a69ca964813",
        //     "coverPhoto": "https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/https://sonopax-file-storage.s3.us-west-1.amazonaws.com/user/cover-photo/7d47a542-bee4-4797-87e6-10abfbf0876d.png%252525252525252525253FX-Amz-Expires%252525252525252525253D86400%2525252525252525252526X-Amz-Algorithm%252525252525252525253DAWS4-HMAC-SHA256%2525252525252525252526X-Amz-Credential%252525252525252525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%2525252525252525252526X-Amz-Date%252525252525252525253D20210518T173416Z%2525252525252525252526X-Amz-SignedHeaders%252525252525252525253Dhost%2525252525252525252526X-Amz-Signature%252525252525252525253D2134f6a92f93725f22825a901a0292a33b98045e140f44ef6befaeb78ff7adb1%2525252525252525253FX-Amz-Expires%2525252525252525253D86400%25252525252525252526X-Amz-Algorithm%2525252525252525253DAWS4-HMAC-SHA256%25252525252525252526X-Amz-Credential%2525252525252525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%25252525252525252526X-Amz-Date%2525252525252525253D20210518T173537Z%25252525252525252526X-Amz-SignedHeaders%2525252525252525253Dhost%25252525252525252526X-Amz-Signature%2525252525252525253Da3e5e95a3c24cf6f75dc37a584f407839ec918090e41d5491b7450592c2e66df%25252525252525253FX-Amz-Expires%25252525252525253D86400%252525252525252526X-Amz-Algorithm%25252525252525253DAWS4-HMAC-SHA256%252525252525252526X-Amz-Credential%25252525252525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%252525252525252526X-Amz-Date%25252525252525253D20210518T173552Z%252525252525252526X-Amz-SignedHeaders%25252525252525253Dhost%252525252525252526X-Amz-Signature%25252525252525253D8b1eb389e162496be78960671a4b5fd3fa7a889d72dd195955576c5349889439%252525252525253FX-Amz-Expires%252525252525253D86400%2525252525252526X-Amz-Algorithm%252525252525253DAWS4-HMAC-SHA256%2525252525252526X-Amz-Credential%252525252525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%2525252525252526X-Amz-Date%252525252525253D20210518T173612Z%2525252525252526X-Amz-SignedHeaders%252525252525253Dhost%2525252525252526X-Amz-Signature%252525252525253Dc43f97d09c1e2a579d0d14414e3c043421a76c7a0bd32477fb0c28a1242c227a%2525252525253FX-Amz-Expires%2525252525253D86400%25252525252526X-Amz-Algorithm%2525252525253DAWS4-HMAC-SHA256%25252525252526X-Amz-Credential%2525252525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%25252525252526X-Amz-Date%2525252525253D20210518T173808Z%25252525252526X-Amz-SignedHeaders%2525252525253Dhost%25252525252526X-Amz-Signature%2525252525253D41cc55e9fb7fa84281aa3646725da14502b031a5f6a9f52c50b4dde5007216f8%25252525253FX-Amz-Expires%25252525253D86400%252525252526X-Amz-Algorithm%25252525253DAWS4-HMAC-SHA256%252525252526X-Amz-Credential%25252525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%252525252526X-Amz-Date%25252525253D20210518T173915Z%252525252526X-Amz-SignedHeaders%25252525253Dhost%252525252526X-Amz-Signature%25252525253D271558c341269cfaeea9fea2842e6276515e2b0460f085ce8c54c35a70c8aeec%252525253FX-Amz-Expires%252525253D86400%2525252526X-Amz-Algorithm%252525253DAWS4-HMAC-SHA256%2525252526X-Amz-Credential%252525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%2525252526X-Amz-Date%252525253D20210518T174021Z%2525252526X-Amz-SignedHeaders%252525253Dhost%2525252526X-Amz-Signature%252525253Dd4b3dfc06fa08b104e77fcb54108812740bf9acde506f3637bce9d8f54ee8bd9%2525253FX-Amz-Expires%2525253D86400%25252526X-Amz-Algorithm%2525253DAWS4-HMAC-SHA256%25252526X-Amz-Credential%2525253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%25252526X-Amz-Date%2525253D20210518T174103Z%25252526X-Amz-SignedHeaders%2525253Dhost%25252526X-Amz-Signature%2525253Df7cbe84f728509eefd5285fc6aa23eecda34f48a3208229ee7d8f0fdfb9f396f%25253FX-Amz-Expires%25253D86400%252526X-Amz-Algorithm%25253DAWS4-HMAC-SHA256%252526X-Amz-Credential%25253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%252526X-Amz-Date%25253D20210518T174322Z%252526X-Amz-SignedHeaders%25253Dhost%252526X-Amz-Signature%25253Dfd1852975a1b4f0dedb56acd57c64ce20d5bb180ceb1c92fd167a6fa11d8549f%253FX-Amz-Expires%253D86400%2526X-Amz-Algorithm%253DAWS4-HMAC-SHA256%2526X-Amz-Credential%253DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%2526X-Amz-Date%253D20210518T174345Z%2526X-Amz-SignedHeaders%253Dhost%2526X-Amz-Signature%253Df71e91ba33f2d7d4ea0f513728689edea717958437ec80b102df24d98bc32f03%3FX-Amz-Expires%3D86400%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAVJUHAU5W2ZMIXNZR/20210518/us-west-1/s3/aws4_request%26X-Amz-Date%3D20210518T174426Z%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3Da7e5535656bfe183857a82891a46637995aff63aef435b083d03cdf0e09649b6?X-Amz-Expires=86400&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVJUHAU5W2ZMIXNZR/20210523/us-west-1/s3/aws4_request&X-Amz-Date=20210523T072438Z&X-Amz-SignedHeaders=host&X-Amz-Signature=cfefb7f354e5f7ca0772ebccbb46258e8f34d30b767966d05109d53fa13ff4da",
        //     "dateOfBirth": "0001-01-01T00:00:00",
        //     "description": null,
        //     "email": "admin@vo.com",
        //     "emailConfirmed": true,
        //     "firstName": null,
        //     "gender": null,
        //     "id": "7d47a542-bee4-4797-87e6-10abfbf0876d",
        //     "lastName": null,
        //     "userName": "admin",
        // }
        // await AsyncStorage.setItem('Token', 'blabla')
        // await AsyncStorage.setItem('user', JSON.stringify(data))
        setLoad(true)
        let body = {
            email: email,
            password: password,
            device: {
                deviceId: "string",
                deviceType: 1,
                model: "string",
                os: "string",
                ip: "string",
                appVersion: "1.0.0",
            },
        };
        try {
            await axios
                .post(`${API_URL}/api/Account/SignIn`, body)
                .then((response) => {
                    console.log('res-', response.data)
                    if (response.data.accepted == false) {
                        setLoad(false)
                        setApiErrorText(response.data.errorMessages[0])
                    } else if (response.data.accepted == true) {
                        setLoad(false)
                        const Token = response.data.data[0].accessToken
                        AsyncStorage.setItem('Token', Token)
                        getUser(Token)
                        setLogin()
                        setApiErrorText('')
                    } else {
                        setLoad(false)
                        setApiErrorText("Something went wrong. Please try again.")
                    }
                })
                .catch((error) => {
                    setLoad(false)
                    console.log(error)
                    setApiErrorText("Something went wrong. Please try again.")
                })
        } catch (e) {
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
                console.log('res-', response.data)
                if (response.data.accepted == false) {
                    setApiErrorText(response.data.errorMessages[0])
                } else if (response.data.accepted == true) {
                    // let user = response.data.data[0]
                    (async () => {
                        await AsyncStorage.setItem('user', JSON.stringify(response.data.data[0]))
                        setUserInfo(response.data.data[0])
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
                    <View style={style.loginContent}>
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
                                <Text style={style.errorText}>Incorrect Password </Text>
                            )}
                        </View>
                        <Text style={style.apierrorText}>{apiErrorText}</Text>
                        <View style={style.forgotPass}>
                            <TouchableWithoutFeedback onPress={goToForgotPass}>
                                <Text
                                    style={style.link}
                                >Forgot Password </Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <PrimaryBtn text="Login" handlePress={login}/>
                        <TouchableOpacity
                            style={style.borderedBtn}
                            onPress={goToRegister}
                        >
                            <Text style={style.greyText}>Register</Text>
                        </TouchableOpacity>

                        <ExternalLogin handlePress={externalLogin}/>
                    </View>
                </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
    )
}
