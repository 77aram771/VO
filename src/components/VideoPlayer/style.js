import {StyleSheet} from "react-native";
import {
    BACKGROUND_COLOR,
    FONT_SIZE,
    ICON_MUTED_BUTTON,
    ICON_PLAY_BUTTON,
    VIDEO_CONTAINER_HEIGHT
} from "../../shared/MockData";
import {windowWidth} from "../../shared/Const";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        backgroundColor: BACKGROUND_COLOR
    },
    wrapper: {
        backgroundColor: 'blue'
    },
    nameContainer: {
        height: FONT_SIZE
    },
    space: {
        height: FONT_SIZE
    },
    videoContainer: {
        height: VIDEO_CONTAINER_HEIGHT
    },
    video: {
        position: 'relative',
    },
    mediaControllerContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // maxHeight: ICON_PLAY_BUTTON.height,
        // minWidth: windowWidth / 2.0,
        // maxWidth: windowWidth / 2.0,
        position: 'absolute',
        top: 0,
        // left: '25%',
        borderWidth: 1,
        borderColor: 'blue',
        borderStyle: 'solid',
        width: windowWidth,
        height: VIDEO_CONTAINER_HEIGHT,
        // backgroundColor: 'red',
        zIndex: 1
    },
    playbackContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        borderWidth: 1,
        borderColor: 'blue',
        borderStyle: 'solid'
    },
    playbackSlider: {
        alignSelf: "stretch",
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    timestampRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
        minHeight: FONT_SIZE,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE
    },
    buffering: {
        textAlign: "left",
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    timestamp: {
        textAlign: "right",
        paddingRight: 20,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    button: {
        backgroundColor: BACKGROUND_COLOR,
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid'
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonsContainerTopRow: {
        maxHeight: ICON_PLAY_BUTTON.height,
        minWidth: windowWidth / 2.0,
        maxWidth: windowWidth / 2.0,
    },
    buttonsContainerMiddleRow: {
        maxHeight: ICON_MUTED_BUTTON.height,
        alignSelf: "stretch",
        paddingRight: 20,
    },
    volumeContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: windowWidth / 2.0,
        maxWidth: windowWidth / 2.0,
    },
    volumeSlider: {
        width: windowWidth / 2.0 - ICON_MUTED_BUTTON.width,
    },
    buttonsContainerBottomRow: {
        alignSelf: "stretch",
        paddingRight: 20,
        paddingLeft: 20
    },
    rateSlider: {
        width: windowWidth / 2.0,
    },
    buttonsContainerTextRow: {
        maxHeight: FONT_SIZE,
        alignItems: "center",
        paddingRight: 20,
        paddingLeft: 20,
        minWidth: windowWidth,
        maxWidth: windowWidth,
        backgroundColor: 'red'
    }
})
