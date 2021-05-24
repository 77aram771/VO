import React from 'react'
import {View, Image, Text, StyleSheet} from "react-native";
import {ICON_COMMENT_LIKE, ICON_COMMENT} from '../../../../shared/MockData'
import {windowWidth} from "../../../../shared/Const";

export const CommentVideo = ({userIcon, userName, commentText, likeNumber, date, commentArray}) => {
    return (
        <View style={style.container}>
            <View>
                <Image source={userIcon.module}/>
            </View>
            <View style={style.commentBox}>
                <Text style={{fontSize: 12, color: '#A4AEB4'}}>{userName}. {date}</Text>
                <Text style={{fontSize: 13, color: '#DEDEDE'}}>{commentText}</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'row', marginRight: 20, }}>
                        <Image source={ICON_COMMENT_LIKE.module}/>
                        <Text style={{fontSize: 10, color: '#797C89'}}>{likeNumber}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={ICON_COMMENT.module}/>
                        <Text style={{fontSize: 10, color: '#797C89'}}>{commentArray.length}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 85,
        // paddingTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#22242C'
    },
    commentBox: {
        width: '80%',
        minHeight: 60,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
})
