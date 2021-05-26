import {StyleSheet} from "react-native"
import {windowHeight} from "../../../shared/Const"

export const style = StyleSheet.create({
    primaryBtn: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(112,123,159,0.25)',
        borderRadius: 100,
        overflow: 'hidden',
        height: 35,
        marginLeft: 5,
        marginRight: 5,

    },
    text: {
        fontSize: 13,
        color: 'white',
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5
    },
})
