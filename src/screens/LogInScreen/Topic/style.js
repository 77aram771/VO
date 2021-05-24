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
      scrollView: {
        paddingVertical: 20,
        flex: 1,
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
      topicContainer: {
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '80%',
        bottom: 0,
        position: 'absolute',
      },
      formGroup: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        fontSize: 18,
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      title: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: windowHeight / 100
      },
      text: {
        fontSize: 14,
        color: '#a4aeb4',
        marginTop: windowHeight / 40,
        marginBottom: windowHeight / 20
      },
      input: {
        width: '100%',
        fontSize: 16,
        height: (windowHeight * 7 ) / 100,
        marginBottom: (windowHeight * 2 ) / 100,
        color: '#A4AEB4',
        borderColor: 'rgba(164, 174, 180, 0.4)',
        borderBottomWidth: 1,
      },
      forgotPass: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 30,
      },
      link: {
        color: '#d0d0d0',
        textAlign: 'center',
        fontSize: 16,
        textDecorationLine: 'underline',
      },
      buttons: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        textAlign: 'center',
      },
      showPass: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: windowHeight / 25,
        height: windowHeight / 25,
        marginTop: 5,
      },
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
      greyText: {
        color: '#888888',
        fontSize: 20,
      },
      bottomFixed: {
        alignItems: 'center',
        flex: 1,
        width: '100%',
        height: '25%',
        bottom: 0,
        position: 'absolute',
        paddingTop: '10%',
        paddingLeft: '7.5%',
        paddingRight: '7.5%',
      },
      transparentGradient: {
        position: 'absolute',
        top: 0,
        left: '-20%',
        bottom: '-10%',
        right: 0,
        width: '160%',
        height: 'auto',
        overflow: 'visible',
      }
})
