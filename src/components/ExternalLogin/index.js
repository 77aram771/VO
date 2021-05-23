import React, {useEffect} from "react";
import {Text, View, Image, TouchableWithoutFeedback} from "react-native"
import {style} from "./style"

export const ExternalLogin = ({handlePress}) => {




    return (
        <View style={style.container}>
            <Text style={style.socialText}>Or sign-up with</Text>
            <View style={style.socialIcons}>
                <TouchableWithoutFeedback style={style.facebook} onPress={() => handlePress('facebook')}>
                    <Image
                        style={style.checkedImg}
                        source={require('../../assets/images/icons/fb.png')}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={style.apple} onPress={() => handlePress('apple')}>
                    <Image
                        style={style.checkedImg}

                        source={require('../../assets/images/icons/apple.png')}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={style.google} onPress={() => handlePress('google')}>
                    <Image
                        style={style.checkedImg}

                        source={require('../../assets/images/icons/google.png')}
                    />
                </TouchableWithoutFeedback>
            </View>

            <View style={style.terms}>
                <TouchableWithoutFeedback>
                    <Text style={style.termsText}>Terms of Service</Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={style.privacy}>
                <TouchableWithoutFeedback>
                    <Text style={style.privacyText}>Privacy policy</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
