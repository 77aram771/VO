import {StyleSheet} from "react-native";
import {windowWidth} from "../../shared/Const";

export const style = StyleSheet.create({
    container: {
        marginTop: 20,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationContainer: {
        width: windowWidth - 20,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#12162D',
        borderRadius: 15,
    },
    navigationBox: {
        paddingLeft: 5,
        paddingRight: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationItem: {
        width: '33%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    navigationItemText: {
        fontSize: 14,
        color: '#fff'
    },
    tabBox: {
        width: '100%',
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20
    },
    tabBoxTitle: {
        color: '#fff',
        fontSize: 15
    },
    autoplayBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabBoxText: {
        color: '#fff',
        fontSize: 13,
        marginRight: 10
    }
})
