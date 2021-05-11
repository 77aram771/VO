import React, {useState} from "react"
import {Keyboard, Text, View, Image, TouchableWithoutFeedback} from "react-native"
import {style} from './style'
import {PassCodeInput} from "../../../components/UI/PassCodeInput"
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"

export const ConfirmReg = ({email}) => {

    const [color, setColor] = useState("rgba(164, 174, 180, 0.4)")
    const [apiErrorText, setApiErrorText] = useState('')

    const dismiseKey = () => {
        Keyboard.dismiss()
    };

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
                    <Text style={style.title}>Enter Confirmation Code</Text>
                    <Text style={style.text}>Enter the confirmation code we sent to</Text>
                    <Text style={style.text}>{email}</Text>
                    <View style={style.formGroup}>
                        <PassCodeInput index="1" color={color} next="nextInput"/>
                        <PassCodeInput index="2" color={color} next="nextInput"/>
                        <PassCodeInput index="3" color={color} next="nextInput"/>
                        <PassCodeInput index="4" color={color} next="nextInput"/>
                    </View>
                    <Text style={style.apierrorText}>{apiErrorText}</Text>

                    <PrimaryBtn text="Next"/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


