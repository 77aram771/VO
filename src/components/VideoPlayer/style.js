import {StyleSheet} from "react-native"
import {FONT_SIZE, ICON_MUTED_BUTTON, ICON_PLAY_BUTTON, VIDEO_CONTAINER_HEIGHT} from "../../shared/MockData"
import {windowWidth} from "../../shared/Const"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "flex-start",
        zIndex: 4,
    },
    wrapper: {
        marginLeft: 25,
        marginRight: 25,
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        position: 'absolute',
        top: 0,
        width: windowWidth,
        height: VIDEO_CONTAINER_HEIGHT,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        zIndex: 3
    },
    mediaControllerContainerTop: {
        paddingTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    mediaControllerContainerMiddle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    mediaControllerContainerBottom: {
        width: '100%',
        // height: 40,
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
        zIndex: 0
    },
    playbackContainer: {
        // flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
        // height: 140,
    },
    playbackSlider: {
        position: 'relative',
        alignSelf: "stretch",
        width: '100%',
        height: 45,
    },
    timestampRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "stretch",
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE
    },
    buffering: {
        textAlign: "left",
        paddingLeft: 20,
    },
    timestamp: {
        textAlign: "right",
        paddingRight: 20,
        color: '#fff',
        marginLeft: 20,
        marginRight: 20
    },
    button: {
        // backgroundColor: 'red'
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
    },
    rootView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "stretch",
    },
    slider: {
        width: '100%',
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    customLabel: {
        fontSize: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    userCommentBox: {
        backgroundColor: '#010126',
        width: windowWidth,
        height: 100,
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    },
    input: {
        width: windowWidth / 2,
        height: 30,
        // borderWidth: 1,
        // borderColor: 'red',
        marginLeft: 20,
    },
    MainContainer: {
        flex: 1,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    TextStyle :{
        fontSize : 20,
        color : '#000'
    }
})
