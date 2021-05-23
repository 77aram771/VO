import React, {useState, useRef, useContext} from "react"
import {
    ActivityIndicator,
    Keyboard,
    styleheet,
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
import {SettingsLang} from "../SettingsLang";
import {SettingsNotification} from "../SettingsNotification"
import {SettingsSubscription} from "../SettingsSubscription";
import {SettingsPassword} from "../SettingsPassword";
import {SettingsEmail} from "../SettingsEmail";
import {SettingsAbout} from "../SettingsAbout";
import {SettingsDelete} from "../SettingsDelete";
import {AsyncStorage} from 'react-native'



export const Settings = () => {

    const {openSettings} = useContext(Context)
    const {setLogout} = useContext(Context)
    const {settingsLangModalVisible} = useContext(Context)
    const {openSettingsLang} = useContext(Context)
    const {settingsNotificationModalVisible} = useContext(Context)
    const {openSettingsNotification} = useContext(Context)
    const {settingsSubscriptionModalVisible} = useContext(Context)
    const {openSettingsSubscription} = useContext(Context)
    const {settingsPasswordModalVisible} = useContext(Context)
    const {openSettingsPassword} = useContext(Context)
    const {settingsEmailModalVisible} = useContext(Context)
    const {openSettingsEmail} = useContext(Context)
    const {settingsAboutModalVisible} = useContext(Context)
    const {openSettingsAbout} = useContext(Context)
    const {settingsDeleteModalVisible} = useContext(Context)
    const {openSettingsDelete} = useContext(Context)

    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const logout = async () => {
        console.log('logout')
        try {
            await AsyncStorage.removeItem('Token');
            await AsyncStorage.removeItem('user');
        }
        catch(exception) {
            return false;
        }
        setLogout()
    }

    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={settingsLangModalVisible}
            supportedOrientations={['portrait', 'landscape']}
            presentationStyle="overFullScreen"
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}>
                    <SettingsLang/>
                </View>
            </View>
        </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsNotificationModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <SettingsNotification/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsSubscriptionModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <SettingsSubscription/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsDeleteModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <SettingsDelete/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsPasswordModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <SettingsPassword/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsEmailModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <SettingsEmail/>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={settingsAboutModalVisible}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%'
                    }}>
                        <SettingsAbout/>
                    </View>
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
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: windowWidth,
                        paddingTop: 10,
                        height: (windowHeight * 10) / 100,
                        opacity: 1,
                        flexDirection: 'row',
                        zIndex: 999
                    }}
                >
                    <BlurView
                        intensity="80"
                        style={{
                            position: 'absolute',
                            top: 0,
                            width: windowWidth,
                            height: (windowHeight * 10) / 100,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#010721',
                                position: 'absolute',
                                top: 0,
                                opacity: 0.8,
                                width: windowWidth,
                                height: (windowHeight * 5) / 100 + windowHeight / 20,
                            }}
                        >
                        </View>
                    </BlurView>
                    <View
                        style={{
                            width: windowWidth,
                            paddingLeft: 10,
                            flexDirection: 'row',
                            height: (windowHeight * 10) / 100,
                            paddingTop: 20,
                            alignItems: 'center',
                        }}
                    >
                        <TouchableOpacity onPress={() => openSettings()}
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
                        >Settings</Text>
                    </View>
                </View>
                <ScrollView
                    content-container-style={{
                        contentContainer: {
                            paddingVertical: 20,
                            flex: 1,
                        },
                    }}
                    style={{
                        paddingTop: (windowHeight * 10) / 100,
                    }}
                >
                    <TouchableOpacity onPress={() => openSettingsLang()}>
                        <View
                            style={{
                              backgroundColor: '#0F1115',
                              flexDirection: 'row',
                              alignItems: 'center',
                              position: 'relative',
                              width: windowWidth,
                              flex: 1,
                              textAlign: 'left',
                              paddingTop: 15,
                              paddingBottom: 15,
                              paddingLeft: 20,
                              paddingRight: 20,
                              borderBottomWidth: 1,
                              borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                  }}
                            >Language</Text>
                            <View
                                style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                right: 20,
                                }}
                            >
                                <Text
                                    style={{
                                      fontSize: 15,
                                      color: 'rgba(235, 235, 245, 0.6)',
                                    }}
                                >English</Text>
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
                    <TouchableOpacity onPress={() => openSettingsNotification()}>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Notifications</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: 'rgba(235, 235, 245, 0.6)',
                                    }}
                                >Off</Text>
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
                    <TouchableOpacity onPress={() => openSettingsSubscription()}>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Subscription</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        color: 'rgba(235, 235, 245, 0.6)',
                                    }}
                                >Free</Text>
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
                    <TouchableOpacity onPress={() => openSettingsPassword()}>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Password</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                    <TouchableOpacity onPress={() => openSettingsEmail()}>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Email address</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >FAQ</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Trust and safety</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Privacy and police</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                    <TouchableOpacity onPress={() => openSettingsAbout()}>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >About app</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Help</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Rate Us</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
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
                    <TouchableOpacity onPress={logout}>
                        <View
                            style={{
                                backgroundColor: '#0F1115',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: '#22242c',
                            }}
                        >
                            <View
                                style={{
                                    marginRight: 5,
                                  }}
                            >
                                <Image
                                    source={require('../../../assets/images/icons/logout.png')}
                                    resizeMode="contain"
                                    style={{
                                      width: 20,
                                      height: 15,
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'white',
                                }}
                            >Logout</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openSettingsDelete()}>
                        <View
                            style={{
                                alignItems: 'center',
                                position: 'relative',
                                width: windowWidth,
                                flex: 1,
                                textAlign: 'left',
                                paddingTop: 20,
                                paddingBottom: 20,
                                paddingLeft: 20,
                                paddingRight: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: '#FF0000',
                                    textDecorationLine: 'underline',
                                }}
                            >Delete account</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    right: 20,
                                }}
                            >
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
        </>
    )
}
