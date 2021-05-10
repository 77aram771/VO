import React from 'react'
import {TouchableOpacity, View} from "react-native"
import {borderStyle} from "../../shared/GlobalStyle"
import SvgUri from "expo-svg-uri"
import {style} from './style'

export const HeaderRightSection = () => {
    return (
        <View style={[borderStyle, style.container]}>
            <TouchableOpacity
                onPress={() => alert('test')}
                style={[borderStyle, style.iconBox]}
            >
                <SvgUri source={require("../../assets/icon/icon-message.svg")}/>
                <View style={style.iconNot}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => alert('test')}
                style={[borderStyle, style.iconBox]}
            >
                <SvgUri source={require("../../assets/icon/icon-notification.svg")}/>
                <View style={style.iconNot}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => alert('test')}
                style={[borderStyle, style.iconBox]}
            >
                <SvgUri source={require("../../assets/icon/icon-search.svg")}/>
            </TouchableOpacity>
        </View>
    )
}
