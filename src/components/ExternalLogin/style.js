import {StyleSheet} from "react-native"
import {windowHeight} from "../../shared/Const"

export const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    socialText: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        marginTop: 20,
        marginBottom: windowHeight / 35,
    },
    socialIcons: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        flexDirection: 'row',
        marginBottom: windowHeight / 35,
    },
    checkedImg: {
        marginLeft: 10,
        marginRight: 10,
        width: windowHeight / 20,
        height: windowHeight / 20,
    },
    terms: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: windowHeight / 50,
    },
    termsText: {
        color: '#d0d0d0',
        fontSize: 14,
    },
    privacy: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    privacyText: {
        color: '#d0d0d0',
        fontSize: 14,
    },
});
