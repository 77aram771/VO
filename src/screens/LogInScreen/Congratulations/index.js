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
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
import {style} from './style'
import {AuthSignIn} from "../../../store/actionsCreators/AuthApiActionCreator";
import {API_URL} from "../../../shared/Const";
import {AsyncStorage} from 'react-native'
import axios from "axios";

export const Congratulations = (props) => {

    const { navigation } = props;
    const [email, setEmail] = useState(props.route.params.email)
    const [fname, setFName] = useState(props.route.params.fname)
    const [lname, setLName] = useState(props.route.params.lname)
    const [passwordType, setPasswordType] = useState(true)
    const [password, setPassword] = useState('')
    const [apiErrorText, setApiErrorText] = useState('')
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [focusPass, setFocusPass] = useState(false)

    useEffect(() => {
        console.log('navigation', navigation)
    }, [])

    const dismiseKey = () => {
        Keyboard.dismiss()
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

    const login = async () => {
        if (!password) {
            setErrorPassword(true)
            return;
        }
        setErrorPassword(false)

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
                    console.log('res-', response)
                    if (response.data.accepted == false) {
                        setApiErrorText(response.data.errorMessages[0])
                    } else if (response.data.accepted == true) {
                        const Token = response.data.data[0].accessToken
                        AsyncStorage.setItem('Token', Token)
                        navigation.navigate('ProfilePicScreen')
                        setApiErrorText('')
                    } else {
                        setApiErrorText("Something went wrong. Please try again.")
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setApiErrorText("Something went wrong. Please try again.")
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
            <Text style={style.title}>Congratulations</Text>
        <Text style={style.title}>{fname} {lname}</Text>
        <Text style={style.text}>Enter password to log in</Text>
            <View style={style.formGroup}>
              {focusPass && (
                  <Image
                  style={style.focusBlured}
                  source={require("../../../assets/images/backgrounds/focus-blured.png")}
                  />
              )}
              {errorPass && (
                  <Image
                  style={style.errorBlured}
                  source={require("../../../assets/images/backgrounds/error-blured.png")}
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
                  source={require("../../../assets/images/icons/show-pass.png")}
                  />
              </TouchableWithoutFeedback>
                {errorPass && (
                    <Text style={style.errorText}>Incorrect Password </Text>
                )}
            </View>
            <View style={style.forgotPass}>
              <TouchableWithoutFeedback onPress={goToForgotPass}>
                <Text
                  style={style.link}
                  >Forgot Password </Text>
              </TouchableWithoutFeedback>
            </View>
            
            <Text style={style.apierrorText}>{ apiErrorText }</Text>
            
            <PrimaryBtn text="Login" handlePress={login}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
}
