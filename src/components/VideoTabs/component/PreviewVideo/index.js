import React from 'react'
import {View, Text, Image} from "react-native";
import {style} from './style'

export const PreviewVideo = ({time, title, text, userName, follow, videoImage, userIcon}) => {
    return (
        <View style={style.container}>
            <View style={style.imageBackground}>
                <Image source={videoImage} style={{width: '100%', height: 76, borderRadius: 6}} resizeMode={'cover'}/>
                <View style={style.timeBox}>
                    <Text style={style.timeBoxText}>
                        {time}
                    </Text>
                </View>
            </View>
            <View style={style.infoBox}>
                <Text style={{color: '#fff', fontSize: 14, marginBottom: 3}}>
                    {title}
                </Text>
                <Text style={{color: '#fff', fontSize: 12, marginBottom: 3}}>
                    {text}
                </Text>
                <View style={style.userBox}>
                    <Image source={userIcon.module} style={{width: 20, height: 20, marginRight: 10}}/>
                    <Text style={{color: '#A4AEB4', fontSize: 12}}>{userName}.</Text>
                    <Text style={{color: '#A4AEB4', fontSize: 12}}>{follow}K Viewers</Text>
                </View>
            </View>
        </View>
    )
}
