import {StyleSheet} from "react-native"
import {windowHeight} from "../../../shared/Const"

export const style = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 'auto',
        height: '100%',
        zIndex: 9999,
      },
      container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
      },
      checkedImg: {
        marginLeft: 10,
        marginRight: 10,
        width: windowHeight / 20,
        height: windowHeight / 20,
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
        marginTop: 20
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
        textAlign: 'right',
        marginBottom: 30,
      },
      link: {
        color: '#d0d0d0',
        textAlign: 'right',
        fontSize: 16,
        textDecorationLine: 'underline',
      },
      buttons: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        textAlign: 'center',
      },
      title: {
        fontSize: 20,
        color: '#a4aeb4',
        marginBottom: windowHeight / 100
      },
      text: {
        fontSize: 14,
        color: 'white',
      },
      greyText: {
        color: '#888888',
        fontSize: 20,
      },
      
      checkbox: {
        position: 'relative',
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      },
      notChecked: {
        borderWidth: 2,
        borderColor: '#888888',
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
      
      focusBlured: {
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        bottom: 0,
        right: 0,
        width: '120%',
        height: 'auto',
      },
      errorBlured: {
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        bottom: 0,
        right: 0,
        width: '120%',
        height: 'auto',
      },
      errorText: {
        position: 'absolute',
        color: '#ff0000',
        fontSize: 12,
        bottom: 0,
        right: 0,
      },
      apierrorText: {
        position: 'relative',
        color: '#ff0000',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center'
      },
      apiDoneText: {
        position: 'relative',
        color: 'green',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center'
      },
      showPass: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: windowHeight / 25,
        height: windowHeight / 25,
        marginTop: 5,
      }
});
