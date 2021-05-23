import React, {useState, useRef, useContext} from "react"
import {
    ActivityIndicator,
    Keyboard,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing,
    FlatList,
    TextInput,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView, Modal
} from "react-native";
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";
import {PrimaryBtn} from "../../../components/UI/PrimaryBtn";


export const EditProfile = ({navigation}) => {

    const [apiErrorText, setApiErrorText] = useState('')
    const top = useRef(new Animated.Value(-300)).current
    const [devicePlatform, setDevicePlatform] = useState(Platform.OS)
    const {user} = useContext(Context)

    const dismiseKey = () => {
        Keyboard.dismiss();
        Animated.timing(top, {
            toValue: -200,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start(() => {});
    };

    const openPopup = () => {
        Animated.timing(top, {
            toValue: 0,
            duration: 300
        }).start();
    }

    const {goToEditProfile} = useContext(Context)
    const {popupModalVisible} = useContext(Context)
    const {openMore} = useContext(Context)

    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={popupModalVisible}
            supportedOrientations={['portrait', 'landscape']}
            presentationStyle="overFullScreen"
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableWithoutFeedback onPress={openMore}>
                    <View style={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <View
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
                                bottom: 0,
                            }}

                        >
                            <TouchableOpacity>
                                <View
                                    style={[style.popupItem, {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }]}
                                >
                                    <View
                                        style={{
                                            marginRight: 5,
                                            paddingTop: 10,
                                            paddingBottom: 10
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/images/icons/my-videos.png')}
                                            resizeMode="contain"
                                            style={{
                                                height: 15,
                                            }}
                                        />
                                    </View>
                                    <Text style={style.greyText}>My Videos</Text>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            right: 0
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: 'rgba(235, 235, 245, 0.6)'
                                            }}
                                        >24</Text>
                                        <Image
                                            source={require('../../../assets/images/icons/arrow-right.png')}
                                            resizeMode="contain"
                                            style={{

                                                height: 15,
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View
                                    style={[style.popupItem, {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }]}
                                >
                                    <View
                                        style={{
                                            marginRight: 5,
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/images/icons/watched.png')}
                                            resizeMode="contain"
                                            style={{
                                                width: 15
                                            }}
                                        />
                                    </View>
                                    <Text style={style.greyText}>Watched videos</Text>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            right: 0
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: 'rgba(235, 235, 245, 0.6)'
                                            }}
                                        >24</Text>
                                        <Image
                                            source={require('../../../assets/images/icons/arrow-right.png')}
                                            resizeMode="contain"
                                            style={{
                                                height: 15,
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View
                                    style={[style.popupItem, {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }]}
                                >
                                    <View
                                        style={{
                                            marginRight: 5,
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/images/icons/liked.png')}
                                            resizeMode="contain"
                                            style={{
                                                width: 15
                                            }}
                                        />
                                    </View>
                                    <Text style={style.greyText}>Liked Videos</Text>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            right: 0
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: 'rgba(235, 235, 245, 0.6)'
                                            }}
                                        >24</Text>
                                        <Image
                                            source={require('../../../assets/images/icons/arrow-right.png')}
                                            resizeMode="contain"
                                            style={{
                                                height: 15,
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View
                                    style={[style.popupItem, {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }]}
                                >
                                    <View
                                        style={{
                                            marginRight: 5,
                                        }}
                                    >
                                        <Image
                                            source={require('../../../assets/images/icons/settings-po.png')}
                                            resizeMode="contain"
                                            style={{
                                                width: 15
                                            }}
                                        />
                                    </View>
                                    <Text style={style.greyText}>Settings</Text>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            right: 0
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: 'rgba(235, 235, 245, 0.6)'
                                            }}
                                        >24</Text>
                                        <Image
                                            source={require('../../../assets/images/icons/arrow-right.png')}
                                            resizeMode="contain"
                                            style={{
                                                height: 15,
                                            }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                <LinearGradient
                    colors={["#181880", "#080836", "#010106", "#000000"]}
                    location={[0, 0.1, 0.4, 1]}
                    style={{
                        position: "absolute",
                        width: windowWidth,
                        height: windowHeight,
                    }}
                />
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: windowWidth,
                        paddingTop: 25,
                        height: (windowHeight * 10) / 100,
                        opacity: 1,
                        flexDirection: 'row',
                        backgroundColor: '#010721',
                    }}
                >
                    <View
                        style={{
                            width: (windowWidth * 80) / 100 - 10,
                            paddingLeft: 10,
                            flexDirection: 'row',
                            height: (windowHeight * 10) / 100,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => goToEditProfile()}
                          style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                          }}
                        >
                            <Image
                                source={require('../../../assets/images/icons/back.png')}
                                resizeMode="contain"
                                style={{
                                    width: (windowWidth * 10) / 100,
                                    height: 20,
                                }}
                            />

                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 24,
                                color: 'white',
                            }}
                        >Edit Profile</Text>
                    </View>

                    <TouchableWithoutFeedback onPress={openMore}>
                        <Image
                            source={require('../../../assets/images/icons/settings.png')}
                            resizeMode="contain"
                            style={{
                                width: (windowWidth * 20) / 100,
                                height: 20,
                                right: -10,
                            }}
                        />
                    </TouchableWithoutFeedback>

                </View>
                <View
                    style={{
                        width: windowWidth,
                        height: 150,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        source={{uri: user.coverPhoto}}
                        resizeMode="cover"
                        style={{
                            width: windowWidth,
                        }}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            zIndex: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            paddingLeft: 5,
                            paddingRight: 5,
                            paddingTop: 5,
                            paddingBottom: 5,
                            borderRadius: 100,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                                color: '#101348',
                                fontWeight: 'bold'
                            }}
                        >+ Change Cover Photo</Text>
                    </TouchableOpacity>
                </View>


                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        top: -20
                    }}
                >
                    <View
                        style={{
                            width: windowWidth,
                            paddingLeft: 10,
                            paddingRight: 10,
                            flexDirection: 'row',
                        }}
                    >

                        <View
                            style={{
                                width: (windowWidth * 20) / 100,
                            }}
                        >
                            <Image
                                source={{uri: user.avatar}}
                                resizeMode="contain"
                                style={{
                                    height: 80,
                                    left: 0,
                                    borderRadius: 1000,
                                    borderWidth: 4,
                                    borderColor: 'black',
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: 30,
                                    right: -10,
                                    zIndex: 2,
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderRadius: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            fontSize: 13,
                                            color: '#101348',
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}
                                    >+</Text>
                                </View>
                            </TouchableOpacity>

                        </View>


                    </View>
                </View>

                <View
                    style={{
                        paddingLeft: 15,
                        paddingRight: 15

                    }}
                >
                    <View style={[style.formGroup, {
                        marginBottom: (windowHeight * 2 ) / 100,
                    }]}
                    >
                        <Text
                            style={{
                                top: 5,
                                fontSize: 12,
                                color: '#A4AEB4'
                            }}
                        >Name</Text>
                        <TextInput
                            style={[style.input, {
                                fontSize: 16,
                                height: (windowHeight * 7 ) / 100,

                                color: '#A4AEB4',
                                borderColor: 'rgba(164, 174, 180, 0.4)',
                                borderBottomWidth: 1,
                            }]}
                            value={user.firstName}
                            placeholder="Name"
                            placeholderTextColor="#A4AEB4"
                            onChangeText="nameInput"
                        />
                    </View>
                    <View style={style.formGroup}>
                        <Text
                            style={{
                                top: 5,
                                fontSize: 12,
                                color: '#A4AEB4'
                            }}
                        >Last Name</Text>
                        <TextInput
                            style={style.input}
                            placeholder="Name"
                            placeholderTextColor="#A4AEB4"
                            onChangeText="lnameInput"
                            value={user.lastName}
                            style={{
                                fontSize: 16,
                                height: (windowHeight * 7 ) / 100,
                                marginBottom: (windowHeight * 2 ) / 100,
                                color: '#A4AEB4',
                                borderColor: 'rgba(164, 174, 180, 0.4)',
                                borderBottomWidth: 1,
                            }}
                        />
                    </View>
                    <View style={style.formGroup}>
                        <Text
                            style={{
                                top: 5,
                                fontSize: 12,
                                color: '#A4AEB4'
                            }}
                        >About</Text>
                        <TextInput
                            class="textarea"
                            placeholder="Name"
                            placeholderTextColor="#A4AEB4"
                            numberOfLines="4"
                            value={user.description}
                            multiline="true"
                            style={{
                                height: windowHeight / 7,
                                color: '#A4AEB4',
                                borderColor: 'rgba(164, 174, 180, 0.4)',
                            }}
                        />
                    </View>
                    <PrimaryBtn text="Save"/>
                </View>
            </View>
        </TouchableWithoutFeedback>
        </>
    )
}
