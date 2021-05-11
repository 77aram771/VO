import React from "react"
import {Image, Slider, Text, TouchableHighlight, View} from "react-native"
import {Audio, Video} from "expo-av"
import {MaterialIcons} from "@expo/vector-icons"
import {windowWidth} from "../../shared/Const"
import {
    BACKGROUND_COLOR, DISABLED_OPACITY,
    ICON_MUTED_BUTTON,
    ICON_PLAY_BUTTON,
    ICON_THROUGH_EARPIECE,
    ICON_THROUGH_SPEAKER,
    LOADING_STRING,
    LOOPING_TYPE_ALL, LOOPING_TYPE_ICONS,
    LOOPING_TYPE_ONE,
    PLAYLIST,
    RATE_SCALE,
    VIDEO_CONTAINER_HEIGHT,
    ICON_UNMUTED_BUTTON,
    ICON_BACK_BUTTON,
    BUFFERING_STRING,
    ICON_PAUSE_BUTTON,
    ICON_FORWARD_BUTTON,
    ICON_STOP_BUTTON
} from "../../shared/MockData"
import {styles} from "./style";

export default class VideoPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.index = 0;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.playbackInstance = null;
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
            fontLoaded: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            videoWidth: windowWidth,
            videoHeight: VIDEO_CONTAINER_HEIGHT,
            poster: false,
            useNativeControls: false,
            fullscreen: false,
            throughEarpiece: false
        };
    }

    componentDidMount() {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });
        (async () => {
            this.setState({fontLoaded: true})
        })();
    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            // this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }

        const source = {uri: PLAYLIST[this.index].uri};
        const initialStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            volume: this.state.volume,
            isMuted: this.state.muted,
            isLooping: this.state.loopingType === LOOPING_TYPE_ONE
        };

        if (PLAYLIST[this.index].isVideo) {
            console.log(this._onPlaybackStatusUpdate);
            await this._video.loadAsync(source, initialStatus);
            this.playbackInstance = this._video;
        } else {
            const {sound} = await Audio.Sound.createAsync(
                source,
                initialStatus,
                this._onPlaybackStatusUpdate
            );
            this.playbackInstance = sound;
        }

        this._updateScreenForLoading(false);
    }

    _mountVideo = component => {
        this._video = component;
        this._loadNewPlaybackInstance(false);
    };

    _updateScreenForLoading(isLoading) {
        if (isLoading) {
            this.setState({
                showVideo: false,
                isPlaying: false,
                playbackInstanceName: LOADING_STRING,
                playbackInstanceDuration: null,
                playbackInstancePosition: null,
                isLoading: true
            });
        } else {
            this.setState({
                playbackInstanceName: PLAYLIST[this.index].name,
                showVideo: PLAYLIST[this.index].isVideo,
                isLoading: false
            });
        }
    }

    _onPlaybackStatusUpdate = status => {
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
                shouldCorrectPitch: status.shouldCorrectPitch
            });
            if (status.didJustFinish && !status.isLooping) {
                this._advanceIndex(true);
                this._updatePlaybackInstanceForIndex(true);
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _onLoadStart = () => {
        console.log(`ON LOAD START`);
    };

    _onLoad = status => {
        console.log(`ON LOAD : ${JSON.stringify(status)}`);
    };

    _onError = error => {
        console.log(`ON ERROR : ${error}`);
    };

    _onReadyForDisplay = event => {
        const widestHeight =
            (windowWidth * event.naturalSize.height) / event.naturalSize.width;
        if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
            this.setState({
                videoWidth:
                    (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
                    event.naturalSize.height,
                videoHeight: VIDEO_CONTAINER_HEIGHT
            });
        } else {
            this.setState({
                videoWidth: windowWidth,
                videoHeight:
                    (windowWidth * event.naturalSize.height) / event.naturalSize.width
            });
        }
    };

    _onFullscreenUpdate = event => {
        console.log(
            `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
        );
    };

    _advanceIndex(forward) {
        this.index =
            (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
    }

    async _updatePlaybackInstanceForIndex(playing) {
        this._updateScreenForLoading(true);

        this.setState({
            videoWidth: windowWidth,
            videoHeight: VIDEO_CONTAINER_HEIGHT
        });

        this._loadNewPlaybackInstance(playing);
    }

    _onPlayPausePressed = () => {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync();
            } else {
                this.playbackInstance.playAsync();
            }
        }
    };

    _onStopPressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.stopAsync();
        }
    };

    _onForwardPressed = () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(true);
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };

    _onBackPressed = () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(false);
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };

    _onMutePressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setIsMutedAsync(!this.state.muted);
        }
    };

    _onLoopPressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setIsLoopingAsync(
                this.state.loopingType !== LOOPING_TYPE_ONE
            );
        }
    };

    _onVolumeSliderValueChange = value => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setVolumeAsync(value);
        }
    };

    _trySetRate = async (rate, shouldCorrectPitch) => {
        if (this.playbackInstance != null) {
            try {
                await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
            } catch (error) {
                // Rate changing could not be performed, possibly because the client's Android API is too old.
            }
        }
    };

    _onRateSliderSlidingComplete = async value => {
        this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
    };

    _onPitchCorrectionPressed = async () => {
        this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
    };

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
    };

    _getSeekSliderPosition() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return (
                this.state.playbackInstancePosition /
                this.state.playbackInstanceDuration
            );
        }
        return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return "0" + string;
            }
            return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(
                this.state.playbackInstancePosition
            )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
        }
        return "";
    }

    _onPosterPressed = () => {
        this.setState({poster: !this.state.poster});
    };

    _onUseNativeControlsPressed = () => {
        this.setState({useNativeControls: !this.state.useNativeControls});
    };

    _onFullscreenPressed = () => {
        try {
            this._video.presentFullscreenPlayer();
        } catch (error) {
            console.log(error.toString());
        }
    };

    _onSpeakerPressed = () => {
        this.setState(
            state => {
                return {throughEarpiece: !state.throughEarpiece};
            },
            ({throughEarpiece}) =>
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                    playThroughEarpieceAndroid: throughEarpiece
                })
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.videoContainer}>
                    <Video
                        ref={this._mountVideo}
                        style={[
                            styles.video,
                            {
                                opacity: this.state.showVideo ? 1.0 : 0.0,
                                width: windowWidth,
                                height: 100,
                            }
                        ]}
                        // resizeMode={Video.RESIZE_MODE_CONTAIN}
                        resizeMode='stretch'

                        onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                        onError={this._onError}
                        onFullscreenUpdate={this._onFullscreenUpdate}
                        onReadyForDisplay={this._onReadyForDisplay}
                        useNativeControls={this.state.useNativeControls}
                    />
                </View>
                <View
                    style={[
                        styles.mediaControllerContainer,
                        {
                            opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
                        }
                    ]}
                >
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        style={styles.wrapper}
                        onPress={this._onBackPressed}
                        disabled={this.state.isLoading}
                    >
                        <Image style={styles.button} source={ICON_BACK_BUTTON.module}/>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        style={styles.wrapper}
                        onPress={this._onPlayPausePressed}
                        disabled={this.state.isLoading}
                    >
                        <Image
                            style={styles.button}
                            source={
                                this.state.isPlaying
                                    ? ICON_PAUSE_BUTTON.module
                                    : ICON_PLAY_BUTTON.module
                            }
                        />
                    </TouchableHighlight>
                    {/*<TouchableHighlight*/}
                    {/*    underlayColor={BACKGROUND_COLOR}*/}
                    {/*    style={styles.wrapper}*/}
                    {/*    onPress={this._onStopPressed}*/}
                    {/*    disabled={this.state.isLoading}*/}
                    {/*>*/}
                    {/*    <Image style={styles.button} source={ICON_STOP_BUTTON.module}/>*/}
                    {/*</TouchableHighlight>*/}
                    <TouchableHighlight
                        underlayColor={BACKGROUND_COLOR}
                        style={styles.wrapper}
                        onPress={this._onForwardPressed}
                        disabled={this.state.isLoading}
                    >
                        <Image style={styles.button} source={ICON_FORWARD_BUTTON.module}/>
                    </TouchableHighlight>
                </View>
                {/*<View*/}
                {/*    style={[*/}
                {/*        styles.playbackContainer,*/}
                {/*        {*/}
                {/*            opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0*/}
                {/*        }*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <Slider*/}
                {/*        style={styles.playbackSlider}*/}
                {/*        // trackImage={ICON_TRACK_1.module}*/}
                {/*        // thumbImage={ICON_THUMB_1.module}*/}
                {/*        value={this._getSeekSliderPosition()}*/}
                {/*        onValueChange={this._onSeekSliderValueChange}*/}
                {/*        onSlidingComplete={this._onSeekSliderSlidingComplete}*/}
                {/*        disabled={this.state.isLoading}*/}
                {/*    />*/}
                {/*    <View style={styles.timestampRow}>*/}
                {/*        <Text*/}
                {/*            style={[*/}
                {/*                styles.text,*/}
                {/*                styles.buffering,*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            {this.state.isBuffering ? BUFFERING_STRING : ""}*/}
                {/*        </Text>*/}
                {/*        <Text*/}
                {/*            style={[*/}
                {/*                styles.text,*/}
                {/*                styles.timestamp,*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            {this._getTimestamp()}*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
                {/*<View*/}
                {/*    style={[*/}
                {/*        styles.buttonsContainerBase,*/}
                {/*        styles.buttonsContainerMiddleRow*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <View style={styles.volumeContainer}>*/}
                {/*        <TouchableHighlight*/}
                {/*            underlayColor={BACKGROUND_COLOR}*/}
                {/*            style={styles.wrapper}*/}
                {/*            onPress={this._onMutePressed}*/}
                {/*        >*/}
                {/*            <Image*/}
                {/*                style={styles.button}*/}
                {/*                source={*/}
                {/*                    this.state.muted*/}
                {/*                        ? ICON_MUTED_BUTTON.module*/}
                {/*                        : ICON_UNMUTED_BUTTON.module*/}
                {/*                }*/}
                {/*            />*/}
                {/*        </TouchableHighlight>*/}
                {/*        <Slider*/}
                {/*            style={styles.volumeSlider}*/}
                {/*            // trackImage={ICON_TRACK_1.module}*/}
                {/*            // thumbImage={ICON_THUMB_2.module}*/}
                {/*            value={1}*/}
                {/*            onValueChange={this._onVolumeSliderValueChange}*/}
                {/*        />*/}
                {/*    </View>*/}
                {/*    <TouchableHighlight*/}
                {/*        underlayColor={BACKGROUND_COLOR}*/}
                {/*        style={styles.wrapper}*/}
                {/*        onPress={this._onLoopPressed}*/}
                {/*    >*/}
                {/*        <Image*/}
                {/*            style={styles.button}*/}
                {/*            source={LOOPING_TYPE_ICONS[this.state.loopingType].module}*/}
                {/*        />*/}
                {/*    </TouchableHighlight>*/}
                {/*</View>*/}
                {/*<View*/}
                {/*    style={[*/}
                {/*        styles.buttonsContainerBase,*/}
                {/*        styles.buttonsContainerBottomRow*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <TouchableHighlight*/}
                {/*        underlayColor={BACKGROUND_COLOR}*/}
                {/*        style={styles.wrapper}*/}
                {/*        onPress={() => this._trySetRate(1.0, this.state.shouldCorrectPitch)}*/}
                {/*    >*/}
                {/*        <View style={styles.button}>*/}
                {/*            <Text*/}
                {/*                style={[styles.text]}*/}
                {/*            >*/}
                {/*                Rate:*/}
                {/*            </Text>*/}
                {/*        </View>*/}
                {/*    </TouchableHighlight>*/}
                {/*    <Slider*/}
                {/*        style={styles.rateSlider}*/}
                {/*        value={this.state.rate / RATE_SCALE}*/}
                {/*        onSlidingComplete={this._onRateSliderSlidingComplete}*/}
                {/*    />*/}
                {/*    <TouchableHighlight*/}
                {/*        underlayColor={BACKGROUND_COLOR}*/}
                {/*        style={styles.wrapper}*/}
                {/*        onPress={this._onPitchCorrectionPressed}*/}
                {/*    >*/}
                {/*        <View style={styles.button}>*/}
                {/*            <Text*/}
                {/*                style={[styles.text]}*/}
                {/*            >*/}
                {/*                PC: {this.state.shouldCorrectPitch ? "yes" : "no"}*/}
                {/*            </Text>*/}
                {/*        </View>*/}
                {/*    </TouchableHighlight>*/}
                {/*    <TouchableHighlight*/}
                {/*        onPress={this._onSpeakerPressed}*/}
                {/*        underlayColor={BACKGROUND_COLOR}*/}
                {/*    >*/}
                {/*        <MaterialIcons*/}
                {/*            name={*/}
                {/*                this.state.throughEarpiece*/}
                {/*                    ? ICON_THROUGH_EARPIECE*/}
                {/*                    : ICON_THROUGH_SPEAKER*/}
                {/*            }*/}
                {/*            size={32}*/}
                {/*            color="black"*/}
                {/*        />*/}
                {/*    </TouchableHighlight>*/}
                {/*</View>*/}
                <View/>
                {/*{this.state.showVideo ? (*/}
                {/*    <View>*/}
                {/*        <View*/}
                {/*            style={[*/}
                {/*                styles.buttonsContainerBase,*/}
                {/*                styles.buttonsContainerTextRow*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <View/>*/}
                {/*            <TouchableHighlight*/}
                {/*                underlayColor={BACKGROUND_COLOR}*/}
                {/*                style={styles.wrapper}*/}
                {/*                onPress={this._onPosterPressed}*/}
                {/*            >*/}
                {/*                <View style={styles.button}>*/}
                {/*                    <Text*/}
                {/*                        style={[styles.text]}*/}
                {/*                    >*/}
                {/*                        Poster: {this.state.poster ? "yes" : "no"}*/}
                {/*                    </Text>*/}
                {/*                </View>*/}
                {/*            </TouchableHighlight>*/}
                {/*            <View/>*/}
                {/*            <TouchableHighlight*/}
                {/*                underlayColor={BACKGROUND_COLOR}*/}
                {/*                style={styles.wrapper}*/}
                {/*                onPress={this._onFullscreenPressed}*/}
                {/*            >*/}
                {/*                <View style={styles.button}>*/}
                {/*                    <Text*/}
                {/*                        style={[styles.text]}*/}
                {/*                    >*/}
                {/*                        Fullscreen*/}
                {/*                    </Text>*/}
                {/*                </View>*/}
                {/*            </TouchableHighlight>*/}
                {/*            <View/>*/}
                {/*        </View>*/}
                {/*        <View style={styles.space}/>*/}
                {/*        /!*<View*!/*/}
                {/*        /!*    style={[*!/*/}
                {/*        /!*        styles.buttonsContainerBase,*!/*/}
                {/*        /!*        styles.buttonsContainerTextRow*!/*/}
                {/*        /!*    ]}*!/*/}
                {/*        /!*>*!/*/}
                {/*        /!*    <View/>*!/*/}
                {/*        /!*    <TouchableHighlight*!/*/}
                {/*        /!*        underlayColor={BACKGROUND_COLOR}*!/*/}
                {/*        /!*        style={styles.wrapper}*!/*/}
                {/*        /!*        onPress={this._onUseNativeControlsPressed}*!/*/}
                {/*        /!*    >*!/*/}
                {/*        /!*        <View style={styles.button}>*!/*/}
                {/*        /!*            <Text*!/*/}
                {/*        /!*                style={[styles.text]}*!/*/}
                {/*        /!*            >*!/*/}
                {/*        /!*                Native Controls:{" "}*!/*/}
                {/*        /!*                {this.state.useNativeControls ? "yes" : "no"}*!/*/}
                {/*        /!*            </Text>*!/*/}
                {/*        /!*        </View>*!/*/}
                {/*        /!*    </TouchableHighlight>*!/*/}
                {/*        /!*    <View/>*!/*/}
                {/*        /!*</View>*!/*/}
                {/*    </View>*/}
                {/*) : null}*/}
            </View>
        )
    }
}