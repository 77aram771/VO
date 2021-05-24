import {StyleSheet} from "react-native"
import {rgbaColor} from "react-native-reanimated/src/reanimated2/Colors"

export const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#22242C'
    },
    imageBackground: {
        width: '40%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        position: 'relative'
    },
    timeBox: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: rgbaColor(23, 36, 90, .6),
        borderRadius: 20,
        position: 'absolute',
        bottom: 5,
        right: 5
    },
    timeBoxText: {
        fontSize: 12,
        color: '#fff'
    },
    infoBox: {
        width: '60%',
        height: 80,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop: 3
    },
    userBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})
