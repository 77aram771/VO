import React, {useEffect, useState, useContext} from 'react'
import {TouchableOpacity, View} from "react-native"
import {borderStyle} from "../../shared/GlobalStyle"
import SvgUri from "expo-svg-uri"
import {style} from './style'
import {Notifications} from "../../screens/HomeScreen/Notifications"
import Context from "../../../Context"

export const HeaderRightSection = ({navigation}) => {
    
    

    useEffect(() => {
        // console.log('modalVisible', modalVisible)
    }, [])
    const {openNotifications} = useContext(Context)

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
                onPress={() => openNotifications()}
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
