import React, {useRef, useState} from "react"
import {Keyboard, Text, View, Image, TouchableWithoutFeedback, TouchableOpacity} from "react-native"
import {style} from './style'
import {PassCodeInput} from "../../../components/UI/PassCodeInput"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import axios from "axios";
import {API_URL, windowHeight, windowWidth} from "../../../shared/Const";

export const ConfirmReg = (props) => {

    const { navigation } = props;
    const [apiErrorText, setApiErrorText] = useState('')

    const [email, setEmail] = useState(props.route.params.emailAddress)
    const [password, setPassword] = useState(props.route.params.userPassword)
    const [color, setColor] = useState("rgba(164, 174, 180, 0.4)")
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [codes, setCodes] = useState('')
    const input1 = useRef(null)
    const input2 = useRef(null)
    const input3 = useRef(null)
    const input4 = useRef(null)
    let code = ["", "", "", ""]

    const dismiseKey = () => {
        Keyboard.dismiss()
    };

    const confirm = async () => {
        let data = {
            email: email,
            token: codes,
        };
        console.log(data)
        try {
            await axios
                .post(`${API_URL}/api/Account/ConfirmEmail`, data)
                .then((response) => {
                    console.log(response)
                    if (response.data.accepted == false) {
                        setApiErrorText(response.data.errorMessages[0])
                        setBtnDisabled(true)
                    } else if (response.data.accepted == true) {
                        setBtnDisabled(false)
                        navigation.navigate("ProfileInfoScreen", {emailAddress: email, userPassword: password});
                    } else {
                        setApiErrorText("Something went wrong. Please try again.")
                        setBtnDisabled(true)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setApiErrorText("Something went wrong. Please try again.")
                    setBtnDisabled(true)
                })
        } catch (e) {
            console.log(e)
        }
    }

    const nextInput = (index, value) => {
        console.log('index-', index)
        console.log('val-', value)
        code[index - 1] = value;
        console.log(code)
        if (value == "" || value == undefined) {
            if (index == 1) {
                input1.current.focus()
            } else if (index == 2) {
                input1.current.focus();
            } else if (index == 3) {
                input2.current.focus();
            } else if (index == 4) {
                input3.current.focus();
            }
            return
        }
        focusInput(index)
    }

    const goToLogin = () => {
        navigation.navigate("LoginScreen")
    }

    const focusInput = async (index) => {
        if (index == 1) {
            input2.current.focus();
        } else if (index == 2) {
            input3.current.focus();
        } else if (index == 3) {
            input4.current.focus();
        } else if (index == 4) {
            if (code.includes("")) {
                console.log("null");
                let emptyIndex = code.indexOf("");
                focusInput(emptyIndex);
            }
            let token = code.join("");
            setCodes(token)

            console.log(token)

            let body = {
                email: email,
                token: token
            };
            try {
                await axios
                    .post(`${API_URL}/api/Account/IsCorrectConfirmationToken`, body)
                    .then((response) => {
                        console.log('res-', response)
                        if (response.data.accepted == false) {
                            console.log('false')
                            setApiErrorText(response.data.errorMessages[0])
                            setColor('red')
                        } else if (response.data.accepted == true) {
                            setBtnDisabled(false)
                            setColor('green')
                            setApiErrorText('')
                        } else {
                            console.log('else')
                            setApiErrorText("Something went wrong. Please try again.")
                            setColor('red')
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        setApiErrorText("Something went wrong. Please try again.")
                        setColor('red')
                    })
            } catch (e) {
                console.log(e)
            }
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
                    <Text style={style.title}>Enter Confirmation Code</Text>
                    <Text style={style.text}>Enter the confirmation code we sent to</Text>
                    <Text style={style.text}>{email}</Text>
                    <View style={style.formGroup}>
                        <PassCodeInput index="1" color={color} handleNextInput={nextInput}  refs={input1}/>
                        <PassCodeInput index="2" color={color} handleNextInput={nextInput}  refs={input2}/>
                        <PassCodeInput index="3" color={color} handleNextInput={nextInput}  refs={input3}/>
                        <PassCodeInput index="4" color={color} handleNextInput={nextInput}  refs={input4}/>
                    </View>
                    <Text style={style.apierrorText}>{apiErrorText}</Text>

                    <PrimaryBtn text="Next" handlePress={confirm} disabled={btnDisabled}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


