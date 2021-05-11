import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../../shared/Const"

export const style = StyleSheet.create({
    codeInput: {
        padding: 5,
        fontSize: 30,
        width: windowWidth / 11,
        height: windowHeight / 15,
        marginRight: windowWidth / 40,
        marginLeft: windowWidth / 40,
        color: '#A4AEB4',
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
    }
})
