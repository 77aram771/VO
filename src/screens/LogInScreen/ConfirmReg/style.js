import {StyleSheet} from "react-native"
import {windowHeight} from "../../../shared/Const"

export const style = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 'auto',
        height: '100%',
    },
    form: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '85%',
        position: 'absolute',
    },
    formGroup: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        fontSize: 18,
        color: 'white',
        marginTop: windowHeight / 20,
        flexDirection: 'row',
        marginBottom: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#a4aeb4',
        marginBottom: windowHeight / 100
    },
    text: {
        fontSize: 14,
        color: '#a4aeb4',
    },
    apierrorText: {
        position: 'relative',
        color: '#ff0000',
        fontSize: 14,
        marginBottom: 10,
    },
});
