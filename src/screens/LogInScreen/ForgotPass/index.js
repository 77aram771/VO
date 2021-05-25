import React, {useState, useRef, useEffect} from "react";
import {
  ActivityIndicator,
  Keyboard,
  Styleheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {API_URL, windowHeight} from "../../../shared/Const";
import { style } from "./style";
import { PassCodeInput } from "../../../components/UI/PassCodeInput";
import { PrimaryBtn } from "../../../components/UI/PrimaryBtn";
import axios from "axios";

export const ForgotPass = ({navigation}) => {
  const [color, setColor] = useState("rgba(164, 174, 180, 0.4)");
  const [resetpass, setResetPass] = useState(true);
  const [emailsend, setEmailSend] = useState(false);
  const [codedone, setCodeDone] = useState(false);
  const [passchanged, setPassChanged] = useState(false);
  const [passwordType, setPasswordType] = useState(true);
  const [cpasswordType, setCPasswordType] = useState(true);
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passErrorText, setPassErrorText] = useState("");
  const [cpassErrorText, setCpassErrorText] = useState("");
  const [apiErrorText, setApiErrorText] = useState("");
  const [apiDoneText, setApiDoneText] = useState("");
  const [email, setEmail] = useState("asdwefw ds");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [errorCPass, setErrorCPass] = useState(false);
  const [focusCPass, setFocusCPass] = useState(false);
  const input1 = useRef(null)
  const input2 = useRef(null)
  const input3 = useRef(null)
  const input4 = useRef(null)
  let code = ["", "", "", ""]
  const [codeToken, setCodeToken] = useState('')

  useEffect(() => {

  }, [])
  const dismiseKey = () => {
    Keyboard.dismiss();
  };

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setFocusEmail(false);
    setEmail(text);
    if (reg.test(text) === false) {
      setErrorEmail(true);
      return false;
    } else {
      setErrorEmail(false);
    }
  };
  const showPass = () => {
    setPasswordType(false);
  };
  const hidePass = () => {
    setPasswordType(true);
  };
  const showCPass = () => {
    setCPasswordType(false);
  };
  const hideCPass = () => {
    setCPasswordType(true);
  };
  const onChangePass = (val) => {
    setPassword(val);
  };
  const onChangeCPass = (val) => {
    setCPassword(val);
  };
  const resendEmail = async () => {
    let data = {
      email: email,
    };

    try {
      await axios
          .post(`${API_URL}/api/User/ForgetPassword`, data)
          .then((response) => {
            if (response.data.accepted == false) {
              setApiErrorText(res.data.errorMessages[0])
            } else if (response.data.accepted == true) {
              setApiErrorText('')
              setApiDoneText("Email was send")
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
  };
  const resetPass = async () => {
    if (errorEmail === true) {
      setFocusEmail(false)
      setFocusEmail(true)
      setEmailErrorText("Incorrect Email Format")
      return;
    }
    if (!email) {
      setErrorEmail(true)
      setEmailErrorText("Incorrect Email Address")
      return;
    }
    setErrorEmail(errorEmail)

    let body = {
      email: email
    };
    try {
      await axios
          .post(`${API_URL}/api/User/ForgetPassword`, body)
          .then((response) => {
            console.log('res-', response)
            if (response.data.accepted == false) {
              console.log('false')
              setApiErrorText(response.data.errorMessages[0])
              // this.apiForgotErrorText = res.data.errorMessages[0];
              // this.apiForgotError = 1;
            } else if (response.data.accepted == true) {
              console.log('true')
              setResetPass(false)
              setEmailSend(true)
              setApiErrorText('')
              // this.resetpass = 0;
              // this.emailsend = 1;
            } else {
              console.log('else')
              setApiErrorText("Something went wrong. Please try again.")
              // this.apiForgotErrorText = "Something went wrong. Please try again.";
              // this.apiForgotError = 1;
            }
          })
          .catch((error) => {
            console.log(error)
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

      setCodeToken(token)

      console.log(token)

      let body = {
        email: email,
        token: token
      };

      // if(token == '1234') {
      //   setCodeDone(true)
      //   setEmailSend(false)
      // } else {
      //   setColor('red')
      // }

      console.log(body)
      try {
        await axios
            .post(`${API_URL}/api/User/IsCorrectConfirmationToken`, body)
            .then((response) => {
              console.log('res-', response)
              if (response.data.accepted == false) {
                console.log('false')
                setApiErrorText(response.data.errorMessages[0])
                setColor('red')
              } else if (response.data.accepted == true) {
                console.log('true')
                setColor('green')
                setTimeout(() => {
                  setCodeDone(true)
                  setEmailSend(false)
                }, 1000)
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
  const changePass = async () => {
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
    let token = code.join("");
    setCodeToken(token)
    let data = {
      email: email,
      password: password,
      token: codeToken
    };
    try {
      await axios
          .post(`${API_URL}/api/User/ResetPassword`, data)
          .then((response) => {
            console.log('res-', response)
            if (response.data.accepted == false) {
              console.log('false')
              setApiErrorText(response.data.errorMessages[0])
            } else if (response.data.accepted == true) {
              console.log('true')
              setPassChanged(true)
              setCodeDone(false)
            } else {
              console.log('else')
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
  const goToLogin = () => {
    navigation.navigate("LoginScreen")
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
          source={require("../../../assets/images/backgrounds/forgotpass-back.png")}
        />

        {resetpass && (
          <View style={style.form}>
            <Text style={style.title}>Forgot your password?</Text>
            <Text style={style.text}>
              We’ll help you reset it and get back on track.
            </Text>
            <View style={style.formGroup}>
              {focusEmail && (
                <Image
                  style={style.focusBlured}
                  source={require("../../../assets/images/backgrounds/focus-blured.png")}
                />
              )}
              {errorEmail && (
                <Image
                  style={style.errorBlured}
                  source={require("../../../assets/images/backgrounds/error-blured.png")}
                />
              )}
              <TextInput
                style={style.input}
                placeholder="Email"
                placeholderTextColor="#A4AEB4"
                onFocus={() => {
                  setFocusEmail(true);
                }}
                onBlur={() => {
                  setFocusEmail(false);
                }}
                onChangeText={validate}
              />
              <Text style={style.apierrorText}>{apiErrorText}</Text>
            </View>
            <PrimaryBtn text="Reset Password" handlePress={resetPass}/>
          </View>
        )}
        {emailsend && (
          <View style={style.form}>
            <Text style={style.title}>
              Password reset link has been sent to
            </Text>
            <Text style={style.emailText}>{email}</Text>
            <View
              style={
                (style.formGroup,
                {
                  marginTop: windowHeight / 20,
                  flexDirection: "row",
                  marginBottom: 30,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                })
              }
            >
              <PassCodeInput index="1" color={color} handleNextInput={nextInput}  refs={input1}/>
              <PassCodeInput index="2" color={color} handleNextInput={nextInput}  refs={input2}/>
              <PassCodeInput index="3" color={color} handleNextInput={nextInput}  refs={input3}/>
              <PassCodeInput index="4" color={color} handleNextInput={nextInput}  refs={input4}/>
            </View>
            <Text style={style.apierrorText}>{apiErrorText}</Text>
            <Text style={style.apiDoneText}>{apiDoneText}</Text>
            <View style={style.forgotPass}>
              <TouchableWithoutFeedback onPress={resendEmail}>
                <Text style={style.link}>Didn’t get the link</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
        {codedone && (
          <View style={style.form}>
            <Text style={style.title}>Set New password</Text>
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
                onFocus={() => {
                  setFocusPass(true);
                  setErrorPass(false);
                }}
                onBlur={() => {
                  setFocusPass(false);
                }}
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
                  <Text style={style.errorText}>{passErrorText}</Text>
              )}
            </View>
            <View style={style.formGroup}>
              {focusCPass && (
                <Image
                  style={style.focusBlured}
                  source={require("../../../assets/images/backgrounds/focus-blured.png")}
                />
              )}
              {errorCPass && (
                <Image
                  style={style.errorBlured}
                  source={require("../../../assets/images/backgrounds/error-blured.png")}
                />
              )}
              <TextInput
                style={style.input}
                placeholder="Repeat password"
                placeholderTextColor="#A4AEB4"
                onChangeText={onChangeCPass}
                onFocus={() => {
                  setFocusCPass(true);
                  setErrorCPass(false);
                }}
                onBlur={() => {
                  setFocusCPass(false);
                }}
                secureTextEntry={cpasswordType}
              />
              <TouchableWithoutFeedback
                onPressIn={showCPass}
                onPressOut={hideCPass}
              >
                <Image
                  style={style.showPass}
                  source={require("../../../assets/images/icons/show-pass.png")}
                />
              </TouchableWithoutFeedback>
              {errorCPass && (
                  <Text style={style.errorText}>{cpassErrorText}</Text>
              )}
            </View>
            <Text style={style.apierrorText}>{apiErrorText}</Text>
            <PrimaryBtn text="Reset Password" handlePress={changePass}/>
          </View>
        )}
        {passchanged && (
          <View style={style.form}>
            <Text
              style={[
                style.title,
                {
                  marginBottom: windowHeight / 20,
                  textAlign: "center",
                },
              ]}
            >
              Your password has been reset successfully
            </Text>
            <PrimaryBtn text="Login" handlePress={goToLogin}/>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
