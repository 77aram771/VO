import React, {useState, useRef, useEffect} from "react";
import {
    Keyboard,
    Text,
    View,
    Image,
    Animated,
    Easing,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView, ImageBackground
} from "react-native";
import {style} from './style'
import {API_URL, windowHeight, windowWidth} from "../../../shared/Const"
import Camera from "expo-camera/src/Camera";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn"
// import ImageCropper from 'react-native-simple-image-cropper';
import {AsyncStorage} from 'react-native'
import axios from "axios";



export const ProfilePic = ({navigation}) => {

    useEffect(() => {
        // console.log('token-', AsyncStorage.getItem('Token'))
    }, [])

    const top = useRef(new Animated.Value(-200)).current
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode);
    const [cameraRef, setCameraRef] = useState(null)
    const [showAvatar, setShowAvatar] = useState(false);
    const [showCamera, setShowCamera] = useState(false)
    const [cropperShow, setCropperShow] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [photoFrom, setPhotoFrom] = useState('')
    const [cropedIMGUri, setCropedIMGUri] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(false)

    const [cropAreaWidth, setCropAreaWidth] = useState(windowWidth)
    const [cropAreaHeight, setCropAreaHeight] = useState(windowHeight)
    const [cropperParams, setCropperParams] = useState('')

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    const dismiseKey = () => {
        Keyboard.dismiss();
        Animated.timing(top, {
            toValue: -200,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {
        });
    };
    const skip = () => {
        navigation.navigate("TopicScreen")
    }
    const openPopup = () => {
        Animated.timing(top, {
            toValue: 0,
            duration: 300
        }).start();
    }
    const openCamera = async () => {
        let photo = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(photo)
        if (!photo.cancelled) {
            setAvatar(photo.uri);
            setShowAvatar(true)
        }
        // setShowCamera(!showCamera)
        // console.log(showCamera)
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
          setAvatar(result.uri);
          setShowAvatar(true)
        }
    };
    const cancleCamera = () => {
        setShowCamera(!showCamera)
    }
    const takePic = async () => {


        // if(cameraRef){
        //   let photo = await cameraRef.takePictureAsync({
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1,
        //   });
        //   console.log(photo)
        //   setAvatar(photo.uri)
        //   setShowCamera(false)
        //   setCropperShow(true)
        //   setPhotoFrom('camera')
        // }
    }
    const takeDock = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          type: "image/*",
        });

        if (!result.type == "cancel") {
          return result;
        }
    }
    const retakePhoto = () => {
        if (photoFrom == 'gallery') {
            setAvatar(null)
            // this.selectFromGallery()
            // .then((res) => {
            //   this.avatar = res.uri;
            //   this.showAvatar = 1;
            //   this.btnDisabled = 0;
            //   this.cropperShow = 1;
            //   this.photoFrom = 'gallery'
            // })
            // .catch((err) => {});
            return;
        } else if (photoFrom == 'camera') {
            setAvatar(null)
            setShowCamera(true)
            setCropperShow(false)
        } else {

        }
    }
    const flip = () => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
    }
    const submite = async () => {
        console.log('clicked')
        // Check if any file is selected or not
        if (avatar != null) {
            try {
                const token = await AsyncStorage.getItem('Token')
                const fileToUpload = avatar;
                const data = new FormData();
                data.append('Avatar', {
                    uri: fileToUpload,
                    type: 'image/jpg',
                    name: 'image.jpg',
                });

                await axios
                    .post(`${API_URL}/api/User/Avatar`, data,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': "Bearer " + token,
                            }
                        }
                    )
                    .then((response) => {
                        console.log('res-', response.data)
                        if (response.data.accepted == false) {
                            // setApiErrorText(response.data.errorMessages[0])
                        } else if (response.data.accepted == true) {
                            // setApiErrorText('')
                            navigation.navigate("TopicScreen")
                        } else {
                            // setApiErrorText("Something went wrong. Please try again.")
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        // setApiErrorText("Something went wrong. Please try again.")
                    })
            } catch (e) {
                console.log(e)
            }
        } else {
            // If no file selected the show alert
            alert('Please Select File first');
        }
    }

    return (
        <ImageBackground
            style={{

                flex: 1
            }}
            resizeMode={"cover"}
            imageStyle={{
                resizeMode: 'cover',
                position: 'absolute',
                bottom: '-15%',
            }}
            source={require('../../../assets/images/backgrounds/forgotpass-back.png')}
        >
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                <View style={style.form}>
                    <Text style={style.title}>Choose your photo</Text>

                    <TouchableOpacity onPress={openPopup}>
                        <View
                            style={style.uploadFrame}
                        >
                            {showAvatar ? (
                                <View>
                                    <Image
                                        resizeMode="cover"
                                        style={{
                                            width: windowHeight / 6.1,
                                            height: windowHeight / 6.1,
                                            borderRadius: 1000,
                                        }}
                                        source={{uri: avatar}}
                                    />
                                    <Text
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            right: 0,
                                            opacity: 0.5,
                                            color: 'white',
                                            width: windowHeight / 6.1,
                                            height: windowHeight / 6.1,
                                            textAlign: 'center',
                                            fontSize: 18,
                                            paddingTop: windowHeight / 14,
                                            backgroundColor: 'black',
                                            borderRadius: 1000,
                                        }}
                                    >Change</Text>
                                </View>
                            ) : (
                                <Text style={style.pluse}>+</Text>
                            )}
                        </View>
                    </TouchableOpacity>

                    <PrimaryBtn text="Submit" disabled={btnDisabled} handlePress={submite}/>
                    <TouchableWithoutFeedback onPress={skip}>
                        <Text style={style.link}>Skip</Text>
                    </TouchableWithoutFeedback>


                    <Animated.View
                        style={{
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
                            bottom: top
                        }}

                    >
                        <TouchableOpacity onPress={openCamera}>
                            <View
                                style={style.popupItem}
                            >
                                <View
                                    style={{
                                        marginRight: 5,
                                    }}
                                >
                                    <Image
                                        source={require('../../../assets/images/icons/photo.png')}
                                        style={{
                                            width: windowHeight / 45,
                                            height: windowHeight / 45,
                                        }}
                                    />
                                </View>
                                <Text style={style.greyText}>Take a photo</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage}>
                            <View
                                style={style.popupItem}
                            >
                                <View
                                    style={{
                                        marginRight: 5,
                                    }}
                                >
                                    <Image
                                        source={require('../../../assets/images/icons/gallery.png')}
                                        style={{
                                            width: windowHeight / 45,
                                            height: windowHeight / 45,
                                        }}
                                    />
                                </View>
                                <Text style={style.greyText}>Choose from your photos</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takeDock}>
                            <View
                                style={style.popupItem}
                            >
                                <View
                                    style={{
                                        marginRight: 5,
                                    }}
                                >
                                    <Image
                                        source={require('../../../assets/images/icons/brows.png')}
                                        style={{
                                            width: windowHeight / 45,
                                            height: windowHeight / 45,
                                        }}
                                    />
                                </View>
                                <Text style={style.greyText}>Browse</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>


                    {showCamera == true && (
                        <View style={style.cameraContainer}>
                            <View
                                style={{
                                    alignItems: 'left',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: windowHeight / 10,
                                    backgroundColor: 'black',
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        marginTop: 30,
                                    }}
                                    onPress={() => {
                                        flash === Camera.Constants.FlashMode.off
                                            ? Camera.Constants.FlashMode.on
                                            : Camera.Constants.FlashMode.off

                                    }}
                                >
                                    <Image
                                        style={[style.flashIcon,
                                            {
                                                width: windowHeight / 20,
                                                height: windowHeight / 20,
                                            }]
                                        }
                                        source={require('../../../assets/images/icons/flash.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Camera
                                style={style.container}
                                type={type}
                                ref={ref => {
                                    setCameraRef(ref);
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%',
                                        height: windowHeight / 5,
                                        backgroundColor: 'black',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '40%',
                                        }}
                                    >
                                        <TouchableOpacity onPress={cancleCamera}>
                                            <Text
                                                style={{
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    fontSize: 18,
                                                    color: '#FFFFFF',
                                                    padding: 20,
                                                }}
                                            >
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            width: '20%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginTop: '-40%',
                                                fontSize: 14,
                                                color: '#FFD60A',
                                                marginBottom: '20%',
                                            }}
                                        >
                                            PHOTO
                                        </Text>
                                        <TouchableOpacity onPress={takePic}>
                                            <View
                                                style={{
                                                    borderWidth: 5,
                                                    borderColor: 'white',
                                                    borderRadius: 1000,
                                                    width: windowWidth / 6,
                                                    height: windowWidth / 6,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: windowWidth / 8,
                                                        height: windowWidth / 8,
                                                        borderRadius: 1000,
                                                        backgroundColor: 'white',
                                                    }}
                                                ></View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            width: '40%',
                                            alignItems: 'flex-end',
                                        }}
                                    >
                                        <TouchableOpacity onPress={flip}>
                                            <Image
                                                source={require('../../../assets/images/icons/flip.png')}
                                                style={{
                                                    margin: 20,
                                                    width: windowHeight / 40,
                                                    height: windowHeight / 40,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Camera>
                        </View>
                    )}

                    {cropperShow && (
                        <View style={style.previewContainer}>
                            <View
                                style={style.container}
                            >
                                {/*<ImageCropper*/}
                                {/*    imageUri={avatar}*/}
                                {/*    cropAreaWidth={cropAreaWidth}*/}
                                {/*    cropAreaHeight={cropAreaHeight}*/}
                                {/*    containerColor="black"*/}
                                {/*    areaColor="black"*/}
                                {/*    setCropperParams={setCropperParams}*/}
                                {/*  />*/}
                                <Image
                                    resizeMode="cover"
                                    style={{
                                        width: windowHeight / 6.1,
                                        height: windowHeight / 6.1,
                                        borderRadius: 1000,
                                    }}
                                    source={{uri: avatar}}
                                />
                                <Image
                                    pointerEvents="none"
                                    style={{
                                        flex: 1,
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        opacity: 1,
                                        width: windowWidth,
                                        height: windowHeight,
                                    }}
                                    source={require('../../../assets/images/backgrounds/photo-preview.png')}
                                />
                            </View>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    height: windowHeight / 8,
                                    backgroundColor: 'black',
                                    flexDirection: 'row',
                                }}
                            >
                                <View
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <TouchableOpacity onPress={retakePhoto}>
                                        <Text
                                            style={{
                                                width: '100%',
                                                textAlign: 'left',
                                                fontSize: 18,
                                                color: '#FFFFFF',
                                                padding: 20,
                                            }}
                                        >
                                            Retake
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <TouchableOpacity onPress={crop}>
                                        <Text
                                            style={{
                                                width: '100%',
                                                textAlign: 'right',
                                                fontSize: 18,
                                                color: '#FFFFFF',
                                                padding: 20,
                                            }}
                                        >
                                            Use Photo
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
        </ImageBackground>
    )
}
