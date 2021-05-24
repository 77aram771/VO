import {StyleSheet} from "react-native"
import {windowHeight, windowWidth} from "../../../shared/Const"

export const style = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  camera: {
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
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '85%',
    height: '100%',
    bottom: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    color: '#a4aeb4',
    marginBottom: windowHeight / 20
  },
  uploadFrame: {
    position: 'relative',
    backgroundColor: '#13152b',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: windowHeight / 6,
    height: windowHeight / 6,
    marginBottom: windowHeight / 20,
  },
  cameraContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: windowWidth,
    height: windowHeight
  },
  previewContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: windowWidth,
    height: windowHeight
  },
  pluse: {
    fontSize: 70,
    color: '#2727f5',
  },
  link: {
    color: '#d0d0d0',
    textAlign: 'center',
    fontSize: 16,
  },
  popupContent: {
    justifyContent: 'center',
    flex: 1,
    width: windowWidth,
    backgroundColor: '#161827',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 50,
    paddingRight: 30,
    paddingLeft: 30,
    position: 'absolute',
  },
  greyText: {
    color: '#797c89',
    fontSize: 16,
  },
  popupItem: {
    position: 'relative',
    width: '100%',
    flex: 1,
    textAlign: 'left',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#22242c',
  },
})
