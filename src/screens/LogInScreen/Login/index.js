import React, {useState, useEffect} from "react"
import {
    ActivityIndicator,
    Keyboard,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ImageBackground
} from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import {windowHeight, windowWidth} from "../../../shared/Const"
import {ExternalLogin} from "../../../components/ExternalLogin"
import {style} from './style'

export const Login = ({navigation}) => {

    const [passwordType, setPasswordType] = useState(true)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(0)
    const [errorPassword, setErrorPassword] = useState(0)
    const [errorLogin, setErrorLogin] = useState(0)

    useEffect(() => {
        console.log('navigation', navigation)
    }, [])

    const dismiseKey = () => {
        Keyboard.dismiss()
    }

    const validate = (text) => {
        let reg = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
        setEmail(text)
        if (reg.test(text) === false) {
            setEmailError(1)
            return false;
        } else {
            setEmailError(0)
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
        navigation.navigate("ForgotPass")
    }

    const goToRegister = () => {
        navigation.navigate("RegisterScreen")
    }

    const login = () => {
        if (emailError === 1) {
            setErrorLogin(1)
            setEmailErrorText("Incorrect Email Format")
            return;
        }
        if (!email) {
            setErrorLogin(1)
            setEmailErrorText("Incorrect Email Address")
            return;
        }
        setErrorLogin(errorLogin)
        if (!password) {
            setErrorPassword(1)
            return;
        }
        setErrorPassword(0)
    }

    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <ImageBackground
                style={{flex: 1}}
                source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
            >
                <View style={style.container}>
                        {/*<ActivityIndicator
                          style={style.loader}
                          animating={load}
                          textContent="Loading..."
                          size="small"
                          color="#ffffff"
                        /> */}
                    <View style={style.loginContent}>
                        <View style={style.formGroup}>
                            {/* <Image
              style={style.focusBlured}
              source={
                require('../../assets/images/backgrounds/focus-blured.png')
              }
            />
            <Image
              style={style.errorBlured}
              source={
                require('../../assets/images/backgrounds/error-blured.png')
              }
            /> */}
                            <TextInput
                                style={style.input}
                                placeholder="Email"
                                placeholderTextColor="#A4AEB4"
                                onChangeText={validate}
                            />
                            <Text style={style.errorText}>{emailErrorText}</Text>
                        </View>
                        <View style={style.formGroup}>
                            {/* <Image
              style={style.focusBlured}
              source={
                require('../../assets/images/backgrounds/focus-blured.png')
              }
            />
            <Image
              style={style.errorBlured}
              source={
                require('../../assets/images/backgrounds/error-blured.png')
              }
            /> */}
                            <TextInput
                                style={style.input}
                                placeholder="Password"
                                placeholderTextColor="#A4AEB4"
                                onChangeText={onChangePass}
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
                            {/* <Text style={style.errorText}>Incorrect Password </Text> */}
                        </View>
                        <Text style={style.apierrorText}>{apiErrorText}</Text>
                        <View style={style.forgotPass}>
                            <TouchableWithoutFeedback onPress={goToForgotPass}>
                                <Text
                                    style={style.link}
                                >Forgot Password </Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <TouchableOpacity
                            style={style.primaryBtn}
                            onPress={login}
                        >
                            <LinearGradient
                                colors={['#2727F5', '#001671']}
                                start={[0.0, 0.5]}
                                end={[1.0, 0.5]}
                                style={{
                                    position: 'absolute',
                                    width: windowWidth,
                                    height: windowHeight / 18,
                                }}
                            />
                            <Text style={style.text}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.borderedBtn}
                            onPress={goToRegister}
                        >
                            <Text style={style.greyText}>Register</Text>
                        </TouchableOpacity>

                        <ExternalLogin/>
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}
