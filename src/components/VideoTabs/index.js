import React, {useState} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Button
} from 'react-native'
import {CommentData, ICON_USER2, tabsData, videoPlayerEpisodesData, videoPlayerUpNextData} from "../../shared/MockData"
import {PreviewVideo} from "./component/PreviewVideo"
import {CommentVideo} from "./component/CommentVideo"
import {style} from './style'


export const VideoTabs = ({autoPlay, handleAutoPlay}) => {

    const [indexNum, setIndexNum] = useState(1)
    const [indexNum2, setIndexNum2] = useState(1)
    const [data, setData] = useState(tabsData)

    const Tab1 = () => {
        return (
            <View
                style={style.container}
            >
                <View
                    style={style.tabBox}
                >
                    <View>
                        <Text style={style.tabBoxTitle}>
                            Related Videos
                        </Text>
                    </View>
                    <View style={style.autoplayBox}>
                        <Text style={style.tabBoxText}>
                            Autoplay
                        </Text>
                        <Switch
                            onValueChange={handleAutoPlay}
                            value={autoPlay}
                            thumbColor={'#fff'}
                            trackColor={{false: '#98e7f0', true: '#244EFF'}}
                            ios_backgroundColor={'#767577'}
                        />
                    </View>
                </View>
                <View style={{paddingLeft: 10, paddingRight: 10}}>
                    {
                        videoPlayerUpNextData.map(item => {
                            return (
                                <PreviewVideo
                                    title={item.title}
                                    userName={item.userName}
                                    follow={item.followNumber}
                                    text={item.text}
                                    time={item.videoTime}
                                    userIcon={item.userIcon}
                                    videoImage={item.videoImage}
                                />
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    const Tab2 = () => {
        return (
            <View
                style={style.container}
            >
                <View style={{
                    width: '100%',
                    paddingLeft: 10, paddingRight: 10
                }}>
                    {
                        CommentData.map(item => {
                            return (
                                <CommentVideo
                                    userIcon={item.userIcon}
                                    userName={item.userName}
                                    commentArray={item.commentArray}
                                    commentText={item.commentText}
                                    date={item.date}
                                    likeNumber={item.likeNumber}
                                />
                            )
                        })
                    }
                </View>
                {/*<View style={style.userCommentBox}>*/}
                {/*    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'centers'}}>*/}
                {/*        <Image source={ICON_USER2.module}/>*/}
                {/*        <TextInput*/}
                {/*            style={style.input}*/}
                {/*            onChangeText={() => console.log('test')}*/}
                {/*            // value={number}*/}
                {/*            placeholder="Add Comment"*/}
                {/*            keyboardType="twitter"*/}
                {/*            placeholderTextColor={'#fff'}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*    <View></View>*/}
                {/*</View>*/}
            </View>
        )
    }

    const Tab3 = () => {
        return (
            <View
                style={style.container}
            >
                <View
                    style={style.tabBox}
                >
                    {
                        videoPlayerEpisodesData.map(item => {
                            console.log('item', item)
                            return (
                                <TouchableOpacity
                                    onPress={() => setIndexNum2(item.id)}
                                    style={{
                                        borderBottomWidth: 3,
                                        borderBottomColor: '#2761FF'
                                    }}
                                >
                                    <Text style={{color: item.active ? '#2761FF' : '#A4AEB4', fontSize: 11}}>
                                        SEASON {item.seasonNum}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }

                </View>
                {
                    indexNum2 === 1
                        ? (
                            <View style={{paddingLeft: 10, paddingRight: 10}}>
                                {
                                    videoPlayerUpNextData.map(item => {
                                        return (
                                            <PreviewVideo
                                                title={item.title}
                                                userName={item.userName}
                                                follow={item.followNumber}
                                                text={item.text}
                                                time={item.videoTime}
                                                userIcon={item.userIcon}
                                                videoImage={item.videoImage}
                                            />
                                        )
                                    })
                                }
                            </View>
                        )
                        : indexNum2 === 2
                        ? (
                            <View style={{paddingLeft: 10, paddingRight: 10}}>
                                {
                                    videoPlayerUpNextData.map(item => {
                                        return (
                                            <PreviewVideo
                                                title={item.title}
                                                userName={item.userName}
                                                follow={item.followNumber}
                                                text={item.text}
                                                time={item.videoTime}
                                                userIcon={item.userIcon}
                                                videoImage={item.videoImage}
                                            />
                                        )
                                    })
                                }
                            </View>
                        )
                        : indexNum2 === 3
                            ? (
                                <View style={{paddingLeft: 10, paddingRight: 10}}>
                                    {
                                        videoPlayerUpNextData.map(item => {
                                            return (
                                                <PreviewVideo
                                                    title={item.title}
                                                    userName={item.userName}
                                                    follow={item.followNumber}
                                                    text={item.text}
                                                    time={item.videoTime}
                                                    userIcon={item.userIcon}
                                                    videoImage={item.videoImage}
                                                />
                                            )
                                        })
                                    }
                                </View>
                            )
                            : null
                }
            </View>
        )
    }

    const handleTabs = (id) => {
        setData(data.map(item => {
            item.active = false
            if (item.id === id) {
                item.active = !item.active
            }
            return item
        }))
        setIndexNum(id)
    }

    return (
        <View style={style.container}>
            <View style={style.navigationContainer}>
                <View style={style.navigationBox}>
                    {
                        tabsData.map(item => {
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        style.navigationItem,
                                        {
                                            backgroundColor: item.active ? '#142C7C' : null
                                        }
                                    ]}
                                    onPress={() => handleTabs(item.id)}
                                >
                                    <Text style={style.navigationItemText}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
            {
                indexNum === 1
                    ? (
                        <Tab1/>
                    )
                    : indexNum === 2
                    ? (
                        <Tab2/>
                    )
                    : indexNum === 3
                        ? (
                            <Tab3/>
                        )
                        : null
            }
        </View>
    )
}
