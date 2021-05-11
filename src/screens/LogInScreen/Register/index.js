import React, {useState} from "react";
import {ActivityIndicator, Keyboard, Text, View, Image, TextInput, TouchableWithoutFeedback} from "react-native"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import {ExternalLogin} from "../../../components/ExternalLogin"
import {style} from './style'

let load = false

export const Register = () => {

    const [passwordType, setPasswordType] = useState(true)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(0)
    const [errorPassword, setErrorPassword] = useState(0)
    const [errorLogin, setErrorLogin] = useState(0)

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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
        this.navigation.navigate("ForgotPass")
    }

    const goToRegister = () => {
        this.navigation.navigate("Register")
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
        setErrorLogin(0)
        if (!password) {
            setErrorPassword(1)
            return;
        }
        setErrorPassword(0)
    }

    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                {/* <ActivityIndicator
          style={style.loader}
          animating={load}
          textContent="Loading..."
          size="small"
          color="#ffffff"
        /> */}
                <Image
                    style={style.background}
                    source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
                />
                <View style={style.form}>
                    <Text style={style.title}>Register</Text>
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
                            placeholder="Repeat password"
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

                    <PrimaryBtn text="Create account"/>

                    <ExternalLogin/>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
