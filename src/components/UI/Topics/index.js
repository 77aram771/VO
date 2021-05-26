import React, {useState} from "react";
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {LinearGradient} from 'expo-linear-gradient'
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {Video} from "../Video";

export const Topics = ({handlePress, items}) => {

    return (
        <ScrollView>
            <View style={{
                marginLeft: 10,
                paddingTop: 10,
                paddingBottom: 5
            }}>
                <FlatList
                    data={items}
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            style={[style.primaryBtn, item.active]}
                            onPress={() => handlePress(item.id)}
                        >
                            {item.selected && (
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
                            )}
                            <Text style={style.text}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
        </ScrollView>
    )
}

