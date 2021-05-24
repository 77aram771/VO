import {StyleSheet} from "react-native"
import {windowHeight} from "../../../shared/Const"

export const style = StyleSheet.create({
    primaryBtn: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'blue',
        borderRadius: 100,
        overflow: 'hidden',
        height: windowHeight / 18,
        marginBottom: windowHeight / 30,
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
})
