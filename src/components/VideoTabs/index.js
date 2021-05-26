import React, {useState} from 'react'
import {View, Text, TouchableOpacity, Switch} from 'react-native'
import {CommentData, tabsData, videoPlayerEpisodesData, videoPlayerUpNextData} from "../../shared/MockData"
import {PreviewVideo} from "./component/PreviewVideo"
import {CommentVideo, SubCommentVideo} from "./component/CommentVideo"
import {style} from './style'

export const VideoTabs = ({autoPlay, handleAutoPlay, handleShowCommentInput}) => {

    const [indexNum, setIndexNum] = useState(1)
    const [indexNum2, setIndexNum2] = useState(1)
    const [indexNum3, setIndexNum3] = useState(1)
    const [data, setData] = useState(tabsData)
    const [data2, setData2] = useState(videoPlayerEpisodesData)
    const [data3, setData3] = useState(CommentData)

    const handleTabs = (id) => {
        setData(data.map(item => {
            item.active = false
            if (item.id === id) {
                item.active = !item.active
            }
            return item
        }))
        setIndexNum(id)
        if (id === 2) {
            handleShowCommentInput(true)
        }
        else {
            handleShowCommentInput(false)
        }
    }

    const handleTabs2 = (id) => {
        setData2(data2.map(item => {
            item.active = false
            if (item.id === id) {
                item.active = !item.active
            }
            return item
        }))
        setIndexNum2(id)
        console.log('indexNum2', indexNum2)
    }

    const handleShowComment = (id) => {
        setData3(data3.map(item => {
            if (item.id === id) {
                item.showSubComment = !item.showSubComment
            } else {
                item.showSubComment = false
            }
            return item
        }))
        setIndexNum3(id)
        console.log('data3', data3)
        console.log('indexNum3', indexNum3)
    }

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
                                <View key={item.id}>
                                    <PreviewVideo
                                        title={item.title}
                                        userName={item.userName}
                                        follow={item.followNumber}
                                        text={item.text}
                                        time={item.videoTime}
                                        userIcon={item.userIcon}
                                        videoImage={item.videoImage}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    const Tab2 = () => {
        return (
            <View style={style.container}>
                <View style={{width: '100%'}}>
                    {
                        data3.map(item => {
                            return (
                                <View key={item.id}>
                                    <CommentVideo
                                        userIcon={item.userIcon}
                                        userName={item.userName}
                                        commentArray={item.commentArray}
                                        commentText={item.commentText}
                                        date={item.date}
                                        likeNumber={item.likeNumber}
                                        index={indexNum3}
                                        handleShowComment={handleShowComment}
                                        showSubComment={item.showSubComment}
                                        id={item.id}
                                    />
                                    {
                                        item.showSubComment
                                            ? (
                                                <SubCommentVideo id={item.id} commentArray={item.commentArray}/>
                                            )
                                            : null
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    const Tab3 = () => {
        return (
            <View style={style.container}>
                <View style={style.tabBox}>
                    {
                        videoPlayerEpisodesData.map(item => {
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleTabs2(item.id)}
                                    style={{
                                        borderBottomWidth: 3,
                                        borderBottomColor: item.active ? '#2761FF' : null,
                                        paddingBottom: 5
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
                                    data2[indexNum2 - 1].episodes.map(item => {
                                        return (
                                            <View key={item.id}>
                                                <PreviewVideo
                                                    title={item.title}
                                                    userName={item.userName}
                                                    follow={item.followNumber}
                                                    text={item.text}
                                                    time={item.videoTime}
                                                    userIcon={item.userIcon}
                                                    videoImage={item.videoImage}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                        : indexNum2 === 2
                        ? (
                            <View style={{paddingLeft: 10, paddingRight: 10}}>
                                {
                                    data2[indexNum2 - 1].episodes.map(item => {
                                        return (
                                            <View key={item.id}>
                                                <PreviewVideo
                                                    title={item.title}
                                                    userName={item.userName}
                                                    follow={item.followNumber}
                                                    text={item.text}
                                                    time={item.videoTime}
                                                    userIcon={item.userIcon}
                                                    videoImage={item.videoImage}
                                                />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                        : indexNum2 === 3
                            ? (
                                <View style={{paddingLeft: 10, paddingRight: 10}}>
                                    {
                                        data2[indexNum2 - 1].episodes.map(item => {
                                            return (
                                                <View key={item.id}>
                                                    <PreviewVideo
                                                        title={item.title}
                                                        userName={item.userName}
                                                        follow={item.followNumber}
                                                        text={item.text}
                                                        time={item.videoTime}
                                                        userIcon={item.userIcon}
                                                        videoImage={item.videoImage}
                                                    />
                                                </View>

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

    return (
        <View style={style.container}>
            <View style={style.navigationContainer}>
                <View style={style.navigationBox}>
                    {
                        data.map(item => {
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
