import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../../shared/Const"

export const style = StyleSheet.create({
    blurView: {
        position: 'absolute',
        top: 0,
        width: windowWidth,
        height: windowHeight,
        zIndex: 2
    },
    more: {
        position: 'absolute',
        top: 5,
        flexDirection: 'row',
        right: 30,
        width: 25,
        height: 20,
    },
    moreDots: {
        width: 5,
        height: 5,
        backgroundColor: '#A4AEB4',
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
    },
    videoCont: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:10,
        paddingBottom: 10,
        backgroundColor: '#010117',
        zIndex: 2
    },
    videoCont2: {
        position: 'absolute',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:10,
        paddingBottom: 10,
        backgroundColor: '#010117',
        zIndex: 2
    },
    actionText: {
        fontSize: 14,
        color: '#FFFFFF',
        paddingLeft: 20,
        paddingRight: 20
    },
    actionRemoveIcon: {
        fontSize: 15,
        color: '#FFFFFF',
        marginBottom: 10
    },
    RightAction: {
        // flex: 1,
        width: 120,
        alignItems: 'center',
        backgroundColor: "#570000",
        justifyContent: "center",
    },
    videoImage: {
        width: (windowWidth * 40 ) / 100 - 10,
        height: 90,
        marginRight: 10
    },
    videoInfo: {
        width: (windowWidth * 60 ) / 100,
        height: 90
    },
    image: {
        width: (windowWidth * 40 ) / 100 - 10,
        height: 90,
    },
    duration: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        zIndex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 100,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: 'white'
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#DEDEDE',
        marginBottom: 5,
        width: (windowWidth * 60 ) / 100 - 80
    },
    desc: {
        fontSize: 12,
        color: '#D1D1D1'
    },
    authorInfo: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    profile: {
        width: (windowWidth * 5 ) / 100,
        height: 20,
        borderWidth: 0.5,
        borderColor: '#5D5D67',
        borderRadius: 100,
        marginRight: 10
    },
    author: {
        fontSize: 12,
        color: '#A4AEB4'
    },
    views: {
        fontSize: 12,
        color: '#A4AEB4'
    },
    dot: {
        width: 5,
        height: 5,
        backgroundColor: '#A4AEB4',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10
    }
})
