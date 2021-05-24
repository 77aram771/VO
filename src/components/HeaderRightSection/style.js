import {StyleSheet} from "react-native"
import {Crimson} from "../../shared/Colors"

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconBox: {
        marginRight: 25,
        position: 'relative'
    },
    iconNot: {
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
        position: 'absolute',
        right: -3,
        backgroundColor: Crimson,
    }
})
