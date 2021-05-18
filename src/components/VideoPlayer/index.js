import React, {Component} from "react"
import {Image, Slider, Text, TouchableOpacity, TouchableHighlight, View, StyleSheet} from "react-native"
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
} from "../../shared/MockData"
import * as ScreenOrientation from "expo-screen-orientation"
import {styles} from "./style"
import {AntDesign} from '@expo/vector-icons'
// import * as VideoThumbnails from 'expo-video-thumbnails';


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
            image: null
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

    _onSeekSliderValueChange = () => {
        if (this.playbackInstance != null && !this.isSeeking) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            this.playbackInstance.pauseAsync();
        }
    };

    _onSeekSliderSlidingComplete = async value => {
        if (this.playbackInstance != null) {
            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;
            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }
        }
    }

    _getSeekSliderPosition() {
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

    _onFullscreenPressed = async () => {
        // this.props.test()
        this.setState({
            fullscreen: !this.state.fullscreen
        }, async () => {
            try {
                // this._video.presentFullscreenPlayer()
            } catch (error) {
                console.log(error.toString())
            }
        })
        if (!this.state.fullscreen) {
            await this.changeScreenOrientation()
        } else {
            await this.changeScreenOrientation2()
        }
    }

    handleTest = () => {
        this.setState({
            controllerNone: false
        }, () => {
            if (!this.isPlaying) {
                setTimeout(() => {
                    this.setState({
                        controllerNone: true
                    })
                }, 5000)
            }
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

    // generateThumbnail = async () => {
    //     try {
    //         const {uri} = await VideoThumbnails.getThumbnailAsync(
    //             'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //             {
    //                 time: 100000,
    //             }
    //         );
    //         // setImage(uri);
    //     } catch (e) {
    //         console.warn(e);
    //     }
    // };

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.state.fullscreen ? {
                            paddingTop: 0
                        }
                        : {
                            paddingTop: this.state.changeModalTrigger ? 40 : 0
                        }
                ]}
            >
                <View style={[styles.rootView, {height: '100%'}]}>
                    <TouchableHighlight
                        style={
                            this.state.fullscreen
                                ? !this.props.changeModalTrigger
                                ? {
                                    width: '100%',
                                    height: '100%',
                                }
                                : {
                                    width: windowWidth / 2.5,
                                    height: windowHeight / 10,
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    borderStyle: 'solid',
                                }
                                : null
                        }
                        onPress={() => this.handleTest()}
                    >
                        <Video
                            ref={this._mountVideo}
                            style={
                                !this.state.fullscreen
                                    ? !this.props.changeModalTrigger
                                    ? [
                                        styles.video,
                                        {
                                            opacity: this.state.showVideo ? 1.0 : 0.0,
                                            width: windowWidth,
                                            height: VIDEO_CONTAINER_HEIGHT
                                        }
                                    ]
                                    : {
                                        width: windowWidth / 2.5,
                                        height: windowHeight / 10,
                                        borderWidth: 1,
                                        borderColor: 'red',
                                        borderStyle: 'solid',
                                    }
                                    : [
                                        StyleSheet.absoluteFill,
                                        {
                                            height: '100%'
                                        }
                                    ]
                            }
                            resizeMode='cover'
                            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                            onLoadStart={this._onLoadStart}
                            onLoad={this._onLoad}
                            onError={this._onError}
                            onFullscreenUpdate={this._onFullscreenUpdate}
                            onReadyForDisplay={this._onReadyForDisplay}
                            useNativeControls={this.state.useNativeControls}
                        />
                    </TouchableHighlight>
                    <View
                        style={[
                            styles.mediaControllerContainer,
                            !this.props.changeModalTrigger
                                ? {
                                    display: this.state.controllerNone ? 'none' : 'flex',
                                    opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
                                    width: '100%',
                                    height: this.state.fullscreen ? '100%' : VIDEO_CONTAINER_HEIGHT,
                                    paddingTop: this.state.fullscreen ? 20 : 0,
                                    paddingBottom: this.state.fullscreen ? 40 : 0,
                                    paddingLeft: this.state.fullscreen ? 50 : 0,
                                    paddingRight: this.state.fullscreen ? 50 : 0
                                }
                                : {display: 'none'}
                        ]}
                    >
                        <View style={styles.mediaControllerContainerTop}>
                            {
                                this.state.fullscreen
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
                                            onPress={this.props.changeModal}
                                            disabled={this.state.isLoading}
                                        >
                                            <Image style={styles.button} source={ICON_ARROW_DOWN.module}/>
                                        </TouchableOpacity>
                                    )
                            }

                            <TouchableOpacity
                                style={styles.wrapper}
                                onPress={() => alert('test')}
                                disabled={this.state.isLoading}
                            >
                                <Image style={styles.button} source={ICON_MENU_HORIZONTAL.module}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mediaControllerContainerMiddle}>
                            <TouchableOpacity
                                style={styles.wrapper}
                                onPress={this._onBackPressed}
                                disabled={this.state.isLoading}
                            >
                                <Image style={styles.button} source={ICON_BACK_BUTTON.module}/>
                            </TouchableOpacity>
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
                            <TouchableOpacity
                                style={styles.wrapper}
                                onPress={this._onForwardPressed}
                                disabled={this.state.isLoading}
                            >
                                <Image style={styles.button} source={ICON_FORWARD_BUTTON.module}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mediaControllerContainerBottom}>
                            <View
                                style={[
                                    styles.playbackContainer,
                                    {opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0}
                                ]}
                            >
                                <View style={styles.timestampRow}>
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
                                </View>
                                <Slider
                                    style={styles.playbackSlider}
                                    // trackImage={ICON_TRACK_1.module}
                                    thumbImage={ICON_THUMB.module}
                                    // thumbTintColor={'#0072C6'}
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
                        this.props.changeModalTrigger
                            ? (
                                <View
                                    style={{
                                        width: '60%',
                                        height: windowHeight / 10,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: 'blue'
                                    }}
                                >
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: 'red',
                                            borderStyle: 'solid',
                                            width: '60%',
                                            height: '100%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Text>
                                            {this.state.playbackInstanceName}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: 'red',
                                            borderStyle: 'solid',
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
                                        onPress={() => this.props.closeModal()}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: 'red',
                                            borderStyle: 'solid',
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
            </View>
        )
    }
}
