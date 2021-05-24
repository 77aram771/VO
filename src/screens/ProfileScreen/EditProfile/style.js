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
})
