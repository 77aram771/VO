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
        height: '80%',
        bottom: 20,
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
        color: '#a4aeb4',
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
      borderedBtn: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'transparent',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#888888',
        overflow: 'hidden',
        height: windowHeight / 18,
        marginBottom: windowHeight / 35,
      },
      greyText: {
        color: '#888888',
        fontSize: 20,
      },
      cols: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        flexDirection: 'row',
        marginBottom: windowHeight / 35
      },
      gender: {
        width: '100%',
        marginBottom: 5,
      },
      genderText: {
        fontSize: 16,
        color: 'white',
      },
      datepicker: {
        width: '100%',
        marginBottom: 30,
      },
      genderTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#a4aeb4',
        marginBottom: 30
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
  },
      doneBlured: {
        position: 'absolute',
        right: 0,
      }
})
