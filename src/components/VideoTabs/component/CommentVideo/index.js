import React from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from "react-native"
import {ICON_COMMENT_LIKE, ICON_COMMENT} from '../../../../shared/MockData'
import {style} from "./style";

export const CommentVideo = ({
                                 userIcon,
                                 userName,
                                 commentText,
                                 likeNumber,
                                 date,
                                 commentArray,
                                 handleShowComment,
                                 showSubComment,
                                 id
                             }) => {
    return (
        <View style={[style.container, {
            backgroundColor: !showSubComment ? '#000' : '#22242C',
            borderBottomWidth: showSubComment ? 0 : 1
        }]}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
                <View>
                    <Image source={userIcon.module}/>
                </View>
                <View style={style.commentContainer}>
                    <Text style={{fontSize: 12, color: '#A4AEB4'}}>{userName}. {date}</Text>
                    <Text style={{fontSize: 13, color: '#DEDEDE'}}>{commentText}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={style.commentBox}>
                            <Image source={ICON_COMMENT_LIKE.module}/>
                            <Text style={{fontSize: 10, color: '#797C89', marginLeft: 4}}>{likeNumber}</Text>
                        </View>
                        <TouchableOpacity
                            style={style.commentBox}
                            onPress={() => handleShowComment(id)}
                        >
                            <Image source={ICON_COMMENT.module}/>
                            <Text style={{fontSize: 10, color: '#797C89', marginLeft: 4}}>{commentArray.length}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const SubCommentVideo = ({commentArray}) => {
    return (
        <View>
            {
                commentArray.map(item => {
                    return (
                        <View style={style.subCommentContainer}>
                            <View style={{paddingLeft: 20}}>
                                <Image source={item.userIcon.module} style={{width: 20, height: 20}}/>
                            </View>
                            <View style={style.commentContainer}>
                                <Text style={{fontSize: 12, color: '#A4AEB4'}}>{item.userName}. {item.date}</Text>
                                <Text style={{fontSize: 13, color: '#DEDEDE'}}>{item.commentText}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={style.commentBox}>
                                        <Image source={ICON_COMMENT_LIKE.module}/>
                                        <Text style={{
                                            fontSize: 10,
                                            color: '#797C89',
                                            marginLeft: 4
                                        }}>{item.likeNumber}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    )
                })
            }
        </View>

    )
}
