import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../../shared/Const"

export const style = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      flex: 1,
      width: '100%',
      },
      topBar: {
        /* backgroundColor: gray, */
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 'auto',
      },
      borderedBtn: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffffff',
        overflow: 'hidden',
      },
      popupContent: {
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        backgroundColor: '#161827',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingBottom: 50,
        paddingRight: 30,
        paddingLeft: 30,
        position: 'absolute',
        bottom: 0,
        zIndex: 20,
      },
      popupItem: {
        position: 'relative',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        textAlign: 'left',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        /* border-bottom-color: blanchedalmond, */
        borderBottomColor: '#22242c',
      },
      greyText: {
        fontSize: 15,
        color: 'white'
      },
      tabBar: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        width: windowWidth,
        height: 80,
        opacity: 0.6,
      },
})
