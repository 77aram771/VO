import React, {useState} from "react";
import {
    StyleSheet,
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

export const Video = (props) => {
    return (
      <TouchableWithoutFeedback
        style={{
          width: windowWidth,
        }}
      >
          <View
            style={{
              width: windowWidth,
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: windowWidth - 30,
                overflow: 'hidden',
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  zIndex: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingTop: 5,
                  paddingBottom: 5,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Image
                  source={require('../../../assets/images/icons/premium-video.png')}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 10,
                    left: 0
                  }}
                />
                <Text
                  style={{
                    fontSize: 11,
                    color: '#F7B202'
                  }}
                >Premium</Text>
              </View>
              <Image
                resizeMode="cover"
                style={{
                  width: windowWidth,
                  height: windowHeight / 4,
                }}
                source={require('../../../assets/images/video-image.png')}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  zIndex: 2,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingTop: 5,
                  paddingBottom: 5,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: 'white'
                  }}
                >{props.item.duration}</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: 5
                }}
              >{props.item.name}</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: 'white'
                }}
              >{props.item.description}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: '#A4AEB4'
                  }}
                >{props.item.posted_at} </Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#A4AEB4',
                  borderRadius: 10,
                  marginLeft: 10,
                  marginRight: 10
                }}
              ></View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#A4AEB4'
                }}
              >{props.item.comments} Comments</Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#A4AEB4',
                  borderRadius: 10,
                  marginLeft: 10,
                  marginRight: 10
                }}
              ></View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#A4AEB4'
                }}
              >{props.item.likes} Likes</Text>
              </View>
            </View>
          </View>
      </TouchableWithoutFeedback>
    )
}

