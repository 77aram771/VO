import React, {useState} from "react";
import {Text, TouchableOpacity} from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'

export const PrimaryBtn = ({handlePress, text, disabled}) => {

    return (
        <TouchableOpacity
            style={style.primaryBtn}
            onPress={() => handlePress()}
            disabled={disabled}
        >
            <LinearGradient
                colors={['#2727F5', '#001671']}
                start={[0.0, 0.5]}
                end={[1.0, 0.5]}
                style={{
                    position: 'absolute',
                    width: windowWidth,
                    height: (windowHeight * 7 ) / 100,
                }}
            />
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    )
}

