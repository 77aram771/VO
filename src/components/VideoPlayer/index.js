import React, {Component} from "react"
import {Image, Slider, Text, TouchableOpacity, View, StyleSheet, ScrollView} from "react-native"
import {Audio, Video} from "expo-av"
import {windowHeight, windowWidth} from "../../shared/Const"
import {
    DISABLED_OPACITY,
    ICON_PLAY_BUTTON,
    LOADING_STRING,
    LOOPING_TYPE_ALL,
    LOOPING_TYPE_ONE,
    PLAYLIST,
    VIDEO_CONTAINER_HEIGHT,
    ICON_BACK_BUTTON,
    ICON_PAUSE_BUTTON,
    ICON_FORWARD_BUTTON,
    ICON_ARROW_DOWN,
    ICON_MENU_HORIZONTAL,
    ICON_THUMB,
    ICON_FULLSCREEN,
    ICON_CHANGE_SECOND_LEFT,
    ICON_CHANGE_SECOND_RIGHT,
    ICON_CHECK,
    ICON_LIKE,
    ICON_SHARE,
    ICON_WATCH,
    ICON_INFO,
    ICON_USER,
    ICON_PLUS,
    ICON_ARROW_DOWN_FOLLOW
} from "../../shared/MockData"
import * as ScreenOrientation from "expo-screen-orientation"
import {styles} from "./style"
import {AntDesign} from '@expo/vector-icons'
import * as VideoThumbnails from 'expo-video-thumbnails'
import ModalWrapper from "react-native-modal-wrapper"
import {LinearGradient} from "expo-linear-gradient"
import VideoTabs from "../VideoTabs"

export default class VideoPlayer extends Component {

    constructor(props) {
        super(props)
        this.index = 0
        this.isSeeking = false
        this.shouldPlayAtEndOfSeek = false
        this.playbackInstance = null
        this.state = {
            showVideo: false,
            playbackInstanceName: LOADING_STRING,
            loopingType: LOOPING_TYPE_ALL,
            muted: false,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            videoWidth: windowWidth,
            videoHeight: VIDEO_CONTAINER_HEIGHT,
            poster: false,
            useNativeControls: false,
            fullscreen: false,
            throughEarpiece: false,
            controllerNone: false,
            showStatus: true,
            seekPosition: 0,
            maxSeek: 0,
            play: false,
            image: null,
            sliderValue: 0
        }
    }

    async componentDidMount() {
        await this.changeScreenOrientation2()
    }

    async changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
    }

    async changeScreenOrientation2() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync()
            // this.playbackInstance.setOnPlaybackStatusUpdate(null)
            this.playbackInstance = null
        }

        const source = {uri: PLAYLIST[this.index].uri}

        const initialStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            volume: this.state.volume,
            isMuted: this.state.muted,
            isLooping: this.state.loopingType === LOOPING_TYPE_ONE
        }

        if (PLAYLIST[this.index].isVideo) {
            await this._video.loadAsync(source, initialStatus)
            this.playbackInstance = this._video
        } else {
            const {sound} = await Audio.Sound.createAsync(
                source,
                initialStatus,
                this._onPlaybackStatusUpdate
            )
            this.playbackInstance = sound
        }

        this._updateScreenForLoading(false)
    }

    _mountVideo = async component => {
        this._video = component
        await this._loadNewPlaybackInstance(false)
    }

    _updateScreenForLoading(isLoading) {
        if (isLoading) {
            this.setState({
                showVideo: false,
                isPlaying: false,
                playbackInstanceName: LOADING_STRING,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true
            })
        } else {
            this.setState({
                playbackInstanceName: PLAYLIST[this.index].name,
                showVideo: PLAYLIST[this.index].isVideo,
                isLoading: false
            })
        }
    }

    _onPlaybackStatusUpdate = async status => {
        if (status.isLoaded) {
            this.setState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
                shouldCorrectPitch: status.shouldCorrectPitch,
            })
            if (status.didJustFinish && !status.isLooping) {
                this._advanceIndex(true)
                await this._updatePlaybackInstanceForIndex(true)
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`)
            }
        }
    }

    _onPlayPausePressed = () => {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync()
            } else {
                this.playbackInstance.playAsync()
            }
        }
    }

    _onLoadStart = () => {
        console.log(`ON LOAD START`)
    }

    _onLoad = status => {
        console.log(`ON LOAD : ${JSON.stringify(status)}`)
    }

    _onError = error => {
        console.log(`ON ERROR : ${error}`)
    }

    _onReadyForDisplay = event => {
        const widestHeight = (windowWidth * event.naturalSize.height) / event.naturalSize.width
        if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
            this.setState({
                videoWidth:
                    (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
                    event.naturalSize.height,
                videoHeight: VIDEO_CONTAINER_HEIGHT
            })
        } else {
            this.setState({
                videoWidth: windowWidth,
                videoHeight:
                    (windowWidth * event.naturalSize.height) / event.naturalSize.width
            })
        }
    }

    _onFullscreenUpdate = event => {
        console.log(`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`)
    }

    _advanceIndex(forward) {
        this.index = (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length
    }

    async _updatePlaybackInstanceForIndex(playing) {
        this._updateScreenForLoading(true)

        this.setState({
            videoWidth: windowWidth,
            videoHeight: VIDEO_CONTAINER_HEIGHT
        })

        await this._loadNewPlaybackInstance(playing)
    }

    _onForwardPressed = async () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(true)
            await this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
        }
    }

    _onBackPressed = async () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(false)
            await this._updatePlaybackInstanceForIndex(this.state.shouldPlay)
        }
    }

    _onSeekSliderValueChange = async (value) => {
        console.log('_onSeekSliderValueChange 2')
        // await this.generateThumbnail(seekPosition)
        if (this.playbackInstance != null && !this.isSeeking) {
            this.isSeeking = true
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay
            this.playbackInstance.pauseAsync()
        }
        const seekPosition = value * this.state.playbackInstanceDuration
        this.setState({
            maxSeek: seekPosition
        }, () => {
            // console.log('this.state.maxSeek', this.state.maxSeek)
            this.generateThumbnail(seekPosition)
        })
    }

    _onSeekSliderSlidingComplete = async value => {
        console.log('_onSeekSliderSlidingComplete 3')

        if (this.playbackInstance != null) {
            this.isSeeking = false
            const seekPosition = value * this.state.playbackInstanceDuration
            if (this.shouldPlayAtEndOfSeek) {
                this.setState({
                    maxSeek: 0
                })
                this.playbackInstance.playFromPositionAsync(seekPosition)
            } else {
                this.setState({
                    maxSeek: 0
                })
                this.playbackInstance.setPositionAsync(seekPosition)
            }
        }
    }

    _getSeekSliderPosition() {
        console.log('_getSeekSliderPosition 1')
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return (
                this.state.playbackInstancePosition /
                this.state.playbackInstanceDuration
            )
        }
        return 0
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000
        const seconds = Math.floor(totalSeconds % 60)
        const minutes = Math.floor(totalSeconds / 60)
        const padWithZero = number => {
            const string = number.toString()
            if (number < 10) {
                return "0" + string
            }
            return string
        }
        return padWithZero(minutes) + ":" + padWithZero(seconds)
    }

    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(this.state.playbackInstancePosition)} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`
        }
        return ""
    }

    _getTimestamp2() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(this.state.maxSeek)} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`
        }
        return ""
    }

    _onFullscreenPressed = async () => {
        this.props.changeFullScree()
        if (!this.props.fullScreenTrigger) {
            await this.changeScreenOrientation()
        } else {
            await this.changeScreenOrientation2()
        }
    }

    handleShowController = () => {
        this.setState({
            controllerNone: false,
        }, () => {
            // if (!this.isPlaying) {
            //     setTimeout(() => {
            //         this.setState({
            //             controllerNone: true
            //         })
            //     }, 5000)
            // }
        })
    }

    handlePlayButton = () => {
        this._onPlayPausePressed()
        setTimeout(() => {
            this.setState({
                controllerNone: true
            })
        }, 2000)
    }

    handlePauseButton = () => {
        this._onPlayPausePressed()
        // setTimeout(() => {
        //     this.setState({
        //         controllerNone: false
        //     })
        // }, 2000)
    }

    generateThumbnail = async (sec) => {
        console.log('sec', sec)
        try {
            const {uri} = await VideoThumbnails.getThumbnailAsync(
                PLAYLIST[this.index].uri,
                {
                    time: Math.floor(sec),
                }
            )
            this.setState({image: uri}, () => {
                console.log('image', this.state.image)
            })
        } catch (e) {
            console.warn(e)
        }
    }

    skip = async (bool) => {
        const status = await this._video.getStatusAsync()
        const curPos = status.positionMillis
        const tenSeconds = 10000
        const newPos = bool ? curPos + tenSeconds : curPos - tenSeconds
        this._video.setPositionAsync(newPos)
    }

    render() {
        const {
            closeModal,
            openSubModal,
            changeModal,
            changeFullScree,
            openModalTrigger,
            changeModalTrigger,
            fullScreenTrigger,
            handleCloseSubModal,
            subModalVisible,
            sectionId,
            subModalData,
            changeSubModal,
            handleChangeSelect,
            handleChangeSectionModal,
            changeFullScreen,
            handleChangeFollow,
            changeFollow
        } = this.props

        const multiplier = 1.15
        const maximumValue = this.state.playbackInstanceDuration
        const logic = maximumValue * multiplier

        const left =
            this.state.maxSeek >= 100000000
                ? this.state.maxSeek * windowWidth / logic
                : this.state.maxSeek * windowWidth / logic

        return (
            <>
                <ModalWrapper
                    containerStyle={{flexDirection: 'row', alignItems: 'flex-end'}}
                    onRequestClose={handleCloseSubModal}
                    style={{
                        flex: 1,
                        borderTopRightRadius: 18,
                        borderTopLeftRadius: 18,
                        backgroundColor: '#161827',
                    }}
                    visible={subModalVisible}
                >
                    <View style={{
                        width: '100%',
                        minHeight: windowHeight / 3.5,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 30,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        {
                            sectionId === 3
                                ? (
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#A4AEB4',
                                            margin: 25
                                        }}
                                    >
                                        {subModalData[sectionId].title}
                                    </Text>
                                )
                                : null
                        }
                        {
                            !changeSubModal
                                ? (
                                    subModalData.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={item.id}
                                                style={{
                                                    width: windowWidth / 1.25,
                                                    height: 40,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    borderBottomStyle: 'solid',
                                                    borderBottomColor: '#22242C',
                                                    borderBottomWidth: 1
                                                }}
                                                onPress={() => handleChangeSectionModal(index)}
                                            >
                                                <Image
                                                    style={{
                                                        marginRight: 20
                                                    }}
                                                    source={item.icon.module}
                                                />
                                                <Text style={{fontSize: 16, color: '#A2ACB2'}}>
                                                    {item.title}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                )
                                : (
                                    subModalData[sectionId].items.map(item => {
                                        return (
                                            <View key={item.id}>
                                                <TouchableOpacity
                                                    key={item.id}
                                                    style={{
                                                        width: windowWidth / 1.25,
                                                        height: 40,
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        borderBottomStyle: 'solid',
                                                        borderBottomColor: '#22242C',
                                                        borderBottomWidth: 1
                                                    }}
                                                    onPress={() => handleChangeSelect(item.id)}
                                                >
                                                    <View style={{width: 10}}>
                                                        {
                                                            item.bool
                                                                ? (
                                                                    <Image source={ICON_CHECK.module}/>
                                                                )
                                                                : null
                                                        }
                                                    </View>
                                                    <Text
                                                        style={{
                                                            marginLeft: 40,
                                                            fontSize: 16,
                                                            color: '#A2ACB2',
                                                        }}
                                                    >
                                                        {item.item}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                )
                        }
                        {
                            sectionId === 3
                                ? (
                                    <>
                                        <TouchableOpacity
                                            style={{
                                                width: 185,
                                                height: 36,
                                                marginTop: 25,
                                                marginBottom: 25,
                                                borderRadius: 25
                                            }}
                                        >
                                            <LinearGradient
                                                colors={['#2727F5', '#001671']}
                                                style={{flex: 1, borderRadius: 25}}
                                                start={{x: 0, y: 0}}
                                                end={{x: 1, y: 0}}
                                            >

                                                <Text style={styles.buttonText}>
                                                    Report
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                width: 185,
                                                height: 36,
                                                marginBottom: 10
                                            }}
                                        >
                                            <Text style={styles.buttonText}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )
                                : null
                        }
                    </View>
                </ModalWrapper>
                <View
                    style={[
                        styles.container,
                        {
                            paddingTop: fullScreenTrigger || changeModalTrigger ? 0 : 40,
                        }
                    ]}
                >
                    <View style={[styles.rootView]}>
                        <TouchableOpacity
                            style={
                                fullScreenTrigger
                                    ? !changeModalTrigger
                                    ? {
                                        width: '100%',
                                        // height: '100%',
                                    }
                                    : {
                                        width: windowWidth / 2.5,
                                        height: windowHeight / 10,
                                    }
                                    : null
                            }
                            onPress={() => this.handleShowController()}
                        >
                            <Video
                                ref={this._mountVideo}
                                style={
                                    !fullScreenTrigger
                                        ? !changeModalTrigger
                                        ? [styles.video,
                                            {
                                                opacity: this.state.showVideo ? 1.0 : 0.0,
                                                width: windowWidth,
                                                height: VIDEO_CONTAINER_HEIGHT
                                            }
                                        ]
                                        : {
                                            width: windowWidth / 2.5,
                                            height: windowHeight / 10,
                                        }
                                        : [StyleSheet.absoluteFill, {height: '100%'}]
                                }
                                resizeMode='cover'
                                onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                                onLoadStart={this._onLoadStart}
                                onLoad={this._onLoad}
                                onError={this._onError}
                                // onFullscreenUpdate={this._onFullscreenUpdate}
                                onReadyForDisplay={this._onReadyForDisplay}
                                useNativeControls={this.state.useNativeControls}
                            />
                        </TouchableOpacity>
                        <View
                            style={[
                                styles.mediaControllerContainer,
                                !changeModalTrigger
                                    ? {
                                        display: this.state.controllerNone ? 'none' : 'flex',
                                        opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
                                        width: '100%',
                                        height: fullScreenTrigger ? '100%' : VIDEO_CONTAINER_HEIGHT,
                                        paddingTop: fullScreenTrigger ? 20 : 0,
                                        paddingBottom: fullScreenTrigger ? 40 : 0,
                                        paddingLeft: fullScreenTrigger ? 50 : 0,
                                        paddingRight: fullScreenTrigger ? 50 : 0,
                                        justifyContent: this.state.maxSeek === 0 ? 'space-between' : 'flex-end',
                                        alignItems: 'flex-end',
                                    }
                                    : {display: 'none'}
                            ]}
                        >
                            {
                                this.state.maxSeek === 0
                                    ? (
                                        <>
                                            <View style={styles.mediaControllerContainerTop}>
                                                {
                                                    fullScreenTrigger
                                                        ? (
                                                            <Text
                                                                style={{
                                                                    color: '#fff'
                                                                }}
                                                            >
                                                                {this.state.playbackInstanceName}
                                                            </Text>
                                                        )
                                                        : (
                                                            <TouchableOpacity
                                                                style={styles.wrapper}
                                                                onPress={changeModal}
                                                                disabled={this.state.isLoading}
                                                            >
                                                                <Image style={styles.button} source={ICON_ARROW_DOWN.module}/>
                                                            </TouchableOpacity>
                                                        )
                                                }
                                                <TouchableOpacity
                                                    style={[styles.wrapper, {
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'flex-end',
                                                        width: 50,
                                                        height: 20,
                                                        paddingTop: 5
                                                    }]}
                                                    onPress={openSubModal}
                                                    disabled={this.state.isLoading}
                                                >
                                                    <Image style={styles.button} source={ICON_MENU_HORIZONTAL.module}/>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.mediaControllerContainerMiddle}>
                                                {
                                                    !fullScreenTrigger
                                                        ? (
                                                            <TouchableOpacity
                                                                style={styles.wrapper}
                                                                onPress={this._onBackPressed}
                                                                disabled={this.state.isLoading}
                                                            >
                                                                <Image style={styles.button} source={ICON_BACK_BUTTON.module}/>
                                                            </TouchableOpacity>
                                                        )
                                                        : (
                                                            <TouchableOpacity
                                                                style={[styles.wrapper,
                                                                    {
                                                                        marginRight: windowWidth / 2
                                                                    }
                                                                ]}
                                                                onPress={() => this.skip(false)}
                                                                disabled={this.state.isLoading}
                                                            >
                                                                <Image style={styles.button}
                                                                       source={ICON_CHANGE_SECOND_RIGHT.module}/>
                                                            </TouchableOpacity>
                                                        )
                                                }

                                                {
                                                    this.state.isPlaying
                                                        ? (
                                                            <TouchableOpacity
                                                                style={styles.wrapper}
                                                                onPress={this.handlePauseButton}
                                                                disabled={this.state.isLoading}
                                                            >
                                                                <Image
                                                                    style={[styles.button]}
                                                                    source={ICON_PAUSE_BUTTON.module}
                                                                />
                                                            </TouchableOpacity>
                                                        )
                                                        : (
                                                            <TouchableOpacity
                                                                style={styles.wrapper}
                                                                onPress={this.handlePlayButton}
                                                                disabled={this.state.isLoading}
                                                            >
                                                                <Image
                                                                    style={[styles.button]}
                                                                    source={ICON_PLAY_BUTTON.module}
                                                                />
                                                            </TouchableOpacity>
                                                        )
                                                }
                                                {
                                                    !fullScreenTrigger
                                                        ? (
                                                            <TouchableOpacity
                                                                style={styles.wrapper}
                                                                onPress={this._onForwardPressed}
                                                                disabled={this.state.isLoading}
                                                            >
                                                                <Image style={styles.button}
                                                                       source={ICON_FORWARD_BUTTON.module}/>
                                                            </TouchableOpacity>
                                                        )
                                                        : (
                                                            <TouchableOpacity
                                                                style={[styles.wrapper,
                                                                    {
                                                                        marginLeft: windowWidth / 2
                                                                    }
                                                                ]}
                                                                onPress={() => this.skip(true)}
                                                                disabled={this.state.isLoading}
                                                            >
                                                                <Image style={styles.button}
                                                                       source={ICON_CHANGE_SECOND_LEFT.module}/>
                                                            </TouchableOpacity>
                                                        )
                                                }

                                            </View>
                                        </>
                                    )
                                    : null
                            }

                            <View style={styles.mediaControllerContainerBottom}>
                                <View
                                    style={[
                                        styles.playbackContainer,
                                        {opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0}
                                    ]}
                                >
                                    <View style={styles.timestampRow}>
                                        {
                                            this.state.maxSeek === 0
                                                ? (
                                                    <>
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                styles.timestamp,
                                                            ]}
                                                        >
                                                            {this._getTimestamp()}
                                                        </Text>
                                                        <TouchableOpacity onPress={() => this._onFullscreenPressed()}>
                                                            <Image
                                                                style={[
                                                                    styles.button, {
                                                                        marginLeft: 20,
                                                                        marginRight: 20
                                                                    }
                                                                ]}
                                                                source={ICON_FULLSCREEN.module}
                                                            />
                                                        </TouchableOpacity>
                                                    </>
                                                )
                                                : null
                                        }
                                    </View>
                                    {
                                        this.state.maxSeek !== 0
                                            ? (
                                                <View
                                                    style={{
                                                        position: 'absolute',
                                                        top: -70,
                                                        left: left - 20,
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderWidth: 1,
                                                        borderColor: 'red',
                                                        borderStyle: 'solid'
                                                    }}
                                                >
                                                    <Image source={{uri: this.state.image}}
                                                           style={{width: 100, height: 55}}/>
                                                    <Text style={{color: '#fff'}}>
                                                        {this._getTimestamp2()}
                                                    </Text>
                                                </View>
                                            )
                                            : null
                                    }
                                    <Slider
                                        style={styles.playbackSlider}
                                        thumbImage={ICON_THUMB.module}
                                        minimumTrackTintColor={'#244EFF'}
                                        maximumTrackTintColor={'#37426E'}
                                        value={this._getSeekSliderPosition()}
                                        onValueChange={this._onSeekSliderValueChange}
                                        onSlidingComplete={this._onSeekSliderSlidingComplete}
                                        disabled={this.state.isLoading}
                                    />
                                </View>
                            </View>
                        </View>
                        {
                            changeModalTrigger
                                ? (
                                    <View
                                        style={{
                                            width: '60%',
                                            height: windowHeight / 10,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            backgroundColor: 'blue',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: '60%',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text style={{color: '#fff'}}>
                                                {this.state.playbackInstanceName}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: '20%',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {
                                                this.state.isPlaying
                                                    ? (
                                                        <TouchableOpacity
                                                            style={styles.wrapper}
                                                            onPress={this.handlePauseButton}
                                                            disabled={this.state.isLoading}
                                                        >
                                                            <Image
                                                                style={[styles.button]}
                                                                source={ICON_PAUSE_BUTTON.module}
                                                            />
                                                        </TouchableOpacity>
                                                    )
                                                    : (
                                                        <TouchableOpacity
                                                            style={styles.wrapper}
                                                            onPress={this.handlePlayButton}
                                                            disabled={this.state.isLoading}
                                                        >
                                                            <Image
                                                                style={[styles.button]}
                                                                source={ICON_PLAY_BUTTON.module}
                                                            />
                                                        </TouchableOpacity>
                                                    )
                                            }
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => closeModal()}
                                            style={{
                                                width: '20%',
                                                height: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <AntDesign name="close" size={24} color="black"/>
                                        </TouchableOpacity>
                                    </View>
                                )
                                : null
                        }
                    </View>
                    {
                        !changeFullScreen && !changeModalTrigger
                            ? (
                                <View
                                    style={{
                                        flex: 3,
                                        width: windowWidth,
                                    }}
                                >
                                    <ScrollView
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: windowWidth,
                                                height: 60,
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 3,
                                                    borderRightColor: '#797C89',
                                                    borderRightWidth: .5,
                                                    borderRightStyle: 'solid'
                                                }}
                                            >
                                                <Image source={ICON_LIKE.module}/>
                                                <Text
                                                    style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Like</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 3,
                                                    borderRightColor: '#797C89',
                                                    borderRightWidth: .5,
                                                    borderRightStyle: 'solid'
                                                }}
                                            >
                                                <Image source={ICON_SHARE.module}/>
                                                <Text
                                                    style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Share</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 3,
                                                    borderRightColor: '#797C89',
                                                    borderRightWidth: .5,
                                                    borderRightStyle: 'solid'
                                                }}
                                            >
                                                <Image source={ICON_WATCH.module}/>
                                                <Text style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Watch
                                                    Later</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 3,
                                                }}
                                            >
                                                <Image source={ICON_INFO.module}/>
                                                <Text
                                                    style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Info</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                width: windowWidth,
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                                paddingLeft: 10,
                                                paddingRight: 10,
                                                marginBottom: 30
                                            }}
                                        >
                                            <Text
                                                style={{fontSize: 17, color: '#fff'}}
                                            >
                                                Stranger Things
                                            </Text>
                                            <Text
                                                style={{fontSize: 13, color: '#fff'}}
                                            >
                                                When a young boy vanishes, a small town uncovers a mystery involving
                                                secret experiments, terrifying supernatural forces and one strange
                                                little girl.
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: windowWidth,
                                                height: 60,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                borderTopWidth: 1,
                                                borderBottomWidth: 1,
                                                borderColor: '#797C89'
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                }}
                                            >
                                                <Image source={ICON_USER.module}/>
                                                <View
                                                    style={{
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        justifyContent: 'space-between',
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'flex-start',
                                                        }}
                                                    >
                                                        <Text style={{fontSize: 14, color: '#fff'}}>
                                                            Zaid AI-Hussair
                                                        </Text>

                                                        <View
                                                            style={{
                                                                height: 17,
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <LinearGradient
                                                                colors={['#2727F5', '#001671']}
                                                                style={{
                                                                    flex: 1,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: 10,
                                                                    padding: 4
                                                                }}
                                                                start={{x: 0, y: 0}}
                                                                end={{x: 1, y: 0}}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        fontSize: 8,
                                                                        color: '#fff',
                                                                    }}
                                                                >
                                                                    CONTRIBUTOR
                                                                </Text>
                                                            </LinearGradient>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'flex-start',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{color: '#A4AEB4', fontSize: 12}}
                                                        >
                                                            410 Videos. 66K Followers
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {
                                                changeFollow
                                                    ? (
                                                        <TouchableOpacity
                                                            style={{
                                                                width: 80,
                                                                height: 28,
                                                            }}
                                                            onPress={() => handleChangeFollow()}
                                                        >
                                                            <LinearGradient
                                                                colors={['#2727F5', '#001671']}
                                                                style={{
                                                                    flex: 1,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: 15,
                                                                    padding: 4
                                                                }}
                                                                start={{x: 0, y: 0}}
                                                                end={{x: 1, y: 0}}
                                                            >
                                                                <Image source={ICON_PLUS.module}/>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 13,
                                                                        color: '#fff',
                                                                        marginLeft: 5
                                                                    }}
                                                                >
                                                                    Follow
                                                                </Text>
                                                            </LinearGradient>
                                                        </TouchableOpacity>
                                                    )
                                                    : (
                                                        <TouchableOpacity
                                                            style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: 85,
                                                                height: 28,
                                                                borderRadius: 15,
                                                                borderStyle: 'solid',
                                                                borderWidth: 1,
                                                                borderColor: '#797C89'
                                                            }}
                                                            onPress={() => handleChangeFollow()}
                                                        >
                                                            <Text
                                                                style={{
                                                                    fontSize: 13,
                                                                    color: '#A4AEB4',
                                                                    marginRight: 5
                                                                }}
                                                            >
                                                                Following
                                                            </Text>
                                                            <Image source={ICON_ARROW_DOWN_FOLLOW.module}/>
                                                        </TouchableOpacity>
                                                    )
                                            }
                                        </View>
                                        <View
                                            style={{
                                                height: '100%'
                                            }}
                                        >
                                            {/*<VideoTabs/>*/}
                                        </View>
                                    </ScrollView>

                                </View>
                            )
                            : null
                    }
                </View>
            </>
        )
    }
}
