import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../../shared/Const"

export const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
  },

  formGroup: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    fontSize: 18,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 0,
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white',
    fontSize: 16,
  },
  textarea: {
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white',
    fontSize: 16,
    paddingRight: 10,
    lineHeight: 23,
  },
  focusBlured: {
    position: 'absolute',
    top: '20%',
    left: '-10%',
    bottom: 0,
    right: 0,
    width: '120%',
    height: 'auto',
  },
  primaryBtn: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'blue',
    borderRadius: 100,
    overflow: 'hidden',
  },
  btnText: {
    fontSize: 20,
    color: 'white',
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
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#22242c',
  },
  greyText: {
    fontSize: 15,
    color: 'white'
  },
  more: {
    position: 'absolute',
    top: 5,
    flexDirection: 'row',
    right: 30,
    width: 25,
    height: 20,
  },
  moreDots: {
    width: 5,
    height: 5,
    backgroundColor: '#a4aeb4',
    borderRadius: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  videoImage: {
    width: 100,
    height: 90,
    marginRight: 10,
  },
  videoInfo: {
    width: 100,
    height: 90,
  },
  image: {
    width: 100,
    height: 90,
  },
  duration: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 100,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: 'white',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dedede',
    marginBottom: 5,
    width: 100 - 80,
  },
  desc: {
    fontSize: 12,
    color: '#d1d1d1',
  },
  authorInfo: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  profile: {
    width: 100,
    height: 20,
    borderWidth: 0.5,
    borderColor: '#5d5d67',
    borderRadius: 100,
    marginRight: 10,
  },
  author: {
    fontSize: 12,
    color: '#a4aeb4',
  },
  views: {
    fontSize: 12,
    color: '#a4aeb4',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#a4aeb4',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  form: {
    alignItems: 'center',
    flex: 1,
    width: '85%',
    height: '88%',
    bottom: 0,
    position: 'absolute',
  },
  plane: {
    width: '100%',
    backgroundColor: '#11111F',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
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
  planeSelected: {
    width: '100%',
    backgroundColor: '#0A0A29',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    borderColor: '#2727F5',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  planeName: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  planePrice: {
    fontSize: 40,
    color: '#FFFFFF',
  },
  planeDesc: {
    fontSize: 14,
    color: '#FFFFFF',
  }
})