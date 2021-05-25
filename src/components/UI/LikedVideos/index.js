import React, { Component } from "react";
import { Animated, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'


export const LikedVideo = (props) =>  {
    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 50],
            outputRange: [0, 50],
            extrapolate: 'clamp'
        });
        return (
            <RectButton style={style.RightAction} onPress={console.log("Pressed")}>
                <Animated.Text
                    style={[
                        style.actionRemoveIcon,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}
                >
                    <Image
                        resizeMode="contain"
                        style={style.icon}
                        source={require('../../../assets/images/icons/liked.png')}
                    />
                </Animated.Text>
                <Animated.Text
                    style={[
                        style.actionText,
                        {
                            transform: [{ translateX: trans }],
                        },
                    ]}
                >
                    Unlike
                </Animated.Text>
            </RectButton>
        );
    };

        return (
            <TouchableOpacity render-prop-fn="renderItem"
                              style={{
                                  width: windowWidth,
                                  overflow: 'hidden',
                                  backgroundColor: 'red',
                                  flex:1,
                              }}
            >
                <Swipeable renderRightActions={renderRightActions}>
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
                            <Text style={style.name}>{props.item.name}</Text>
                            <Text style={style.desc}>{props.item.desc}</Text>
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
                    </View>
                </Swipeable>
            </TouchableOpacity>
        )
}

