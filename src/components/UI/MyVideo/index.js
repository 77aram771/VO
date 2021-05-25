import React, {useState} from "react";
import {
    styleheet,
    Text,
    Dimensions,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'


export const MyVideo = (props) => {
    const handleOpenPopup = key => event => {
        var popup = true;
        let data = {
            popup: popup,
            item: key
        }
        props.parentMoreClick(data);
    }

    return (
        <TouchableOpacity render-prop-fn="renderItem"
                          style={{
                              width: windowWidth,
                              overflow: 'hidden',
                              backgroundColor: 'red',
                              flex:1,
                          }}
        >
            <View>
                <View style={style.videoCont} >
                    <View style={style.videoImage}>
                        <Image
                            resizeMode="contain"
                            style={style.image}
                            source={require('../../../assets/images/notification-video-img.png')}
                        />
                        <View style={style.duration}>
                            <Text style={style.text}>{props.item.duration}</Text>
                        </View>
                    </View>
                    <View style={style.videoInfo}>
                        <Text style={style.name} numberOfLines={1} ellipsizeMode='tail'>{props.item.name}</Text>
                        <Text style={style.desc} numberOfLines={2} ellipsizeMode='tail'>{props.item.desc}</Text>
                        <View style={style.authorInfo}>
                            <Image
                                resizeMode="contain"
                                style={style.profile}
                                source={require('../../../assets/images/notification-pick.png')}
                            />
                            <Text style={style.author}>{props.item.author}</Text>
                            <View style={style.dot}></View>
                            <Text style={style.views}>{props.item.views}K Views</Text>
                        </View>
                    </View>
                    <TouchableOpacity key={props.item.id} onPress={handleOpenPopup(props.item.id)}>
                        <View style={style.more}>
                            <View style={style.moreDots}></View>
                            <View style={style.moreDots}></View>
                            <View style={style.moreDots}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

