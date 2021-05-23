import React, {useState} from "react";
import {ActivityIndicator, Keyboard, Text, View, Image, TextInput, TouchableWithoutFeedback} from "react-native"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import {ExternalLogin} from "../../../components/ExternalLogin"
// import {CheckBox} from " ../../../components/UI/CheckBox"
import {style} from './style'
import axios from "axios";
import {API_URL} from "../../../shared/Const";

let load = false

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

        try {
            await axios
                .post(`${API_URL}/api/Account/SignUpConfirmation`, data)
                .then((response) => {
                    console.log(response)
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
                    console.log(error)
                })
        } catch (e) {
            console.log(e)
        }
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
                    <ExternalLogin/>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
