import React from "react"
import {View} from "react-native"
import SvgUri from "expo-svg-uri"
import {style} from './style'

export const HeaderLogo = () => {
    return (
        <View style={style.iconBox}>
            <SvgUri
                width="55"
                height="30"
                source={require("../../assets/img/logo-VO.svg")}
            />
        </View>
    )
}
