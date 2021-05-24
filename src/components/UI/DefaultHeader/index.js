import React, {useContext, useState} from "react"
import {Text, TextInput, View, TouchableWithoutFeedback, Image} from "react-native"
import {windowHeight, windowWidth} from "../../../shared/Const"
import Context from "../../../../Context";

export const DefaultHeader = () => {

    const {openNotifications} = useContext(Context)

    return (
        <View
            style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                top: 15,
                width: windowWidth,
                height: 80,
                opacity: 0.6,
                flexDirection: 'row',
                paddingTop: 12,
            }}
        >
            {/* <BlurView
                    intensity="80"
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: windowWidth,
                        height: (windowHeight * 5) / 100 + windowHeight / 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#010721',
                            position: 'absolute',
                            top: 0,
                            opacity: 0.8,
                            width: windowWidth,
                            height: (windowHeight * 5) / 100 + windowHeight / 20,
                        }}
                    >
                    </View>
                </BlurView> */}

            <TouchableWithoutFeedback onPress={() => openNotifications()}>
                <View
                    style={{
                      width: windowWidth,
                      paddingLeft: 10,
                      flexDirection: 'row',
                      height: (windowHeight * 5) / 100,
                      alignItems: 'center',
                    }}
                >
                <Image
                    source={require('../../../assets/images/icons/back.png')}
                    resizeMode="contain"
                    style={{
                        width: (windowWidth * 10) / 100,
                        height: 20,
                    }}
                />
                    <Text
                      style={{
                        fontSize: 24,
                        color: 'white',
                      }}
                    >Notifications</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};



