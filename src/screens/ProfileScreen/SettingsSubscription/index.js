import React, {useState, useRef, useContext} from "react"
import {
    Keyboard,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import {windowHeight, windowWidth} from "../../../shared/Const"
import {style} from './style'
import {LinearGradient} from "expo-linear-gradient";
import { BlurView } from 'expo-blur';
import Context from "../../../../Context";



export const SettingsSubscription = () => {

    const {openSettingsSubscription} = useContext(Context)
    const [subscription, setSubscription] = useState('free')
    const [verifyPremium, setVerifyPremium] = useState(true)
    const [selectPlan, setSelectPlan] = useState(false)
    const [plane, setPlane] = useState('monthly')


    const dismiseKey = () => {
        Keyboard.dismiss();
    };

    const selectSubscription = () => {
        subscription === 'free'
        ?
            setSubscription('premium')
        :
            setSubscription('free')
    }

    const upgrade = () => {
        setVerifyPremium(false)
        setSelectPlan(true)
    }

    const selectPlane = () => {
        plane === 'monthly'
            ?
            setPlane('annually')
            :
            setPlane('monthly')
    }

    const goToPrivacyPolicy = () => {

    }
    return (
        <TouchableWithoutFeedback onPress={dismiseKey}>
            <View style={style.container}>
                <LinearGradient
                    colors={["#181880", "#010106", "#010106", "#000000"]}
                    location={[0, 0.1, 0.2, 1]}
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
                        <TouchableOpacity onPress={() => openSettingsSubscription()}
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
                        >Subscription</Text>
                    </View>
                </View>
                {subscription == 'free' && (
                    <View
                        style={{
                            paddingTop: (windowHeight * 10) / 100,
                        }}
                    >
                        <TouchableOpacity onPress={selectSubscription}>
                            <View
                                style={{
                                    backgroundColor: '#0F1115',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    position: 'relative',
                                    width: windowWidth,
                                    textAlign: 'left',
                                    paddingTop: 20,
                                    paddingBottom: 20,
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
                                >Free</Text>
                                <View
                                    style={{
                                        position: 'absolute',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        right: 10,
                                    }}
                                >
                                    {subscription == 'free' && (
                                        <Image
                                            source={require('../../../assets/images/icons/checked.png')}
                                            resizeMode="contain"
                                            style={{
                                                height: 13,
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectSubscription}>
                            <View
                                style={{
                                    backgroundColor: '#0F1115',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    position: 'relative',
                                    width: windowWidth,
                                    textAlign: 'left',
                                    paddingTop: 20,
                                    paddingBottom: 20,
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
                                >Premium</Text>
                                <View
                                    style={{
                                        position: 'absolute',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        right: 10,
                                    }}
                                >
                                    {subscription == 'premium' && (
                                        <Image
                                            source={require('../../../assets/images/icons/checked.png')}
                                            resizeMode="contain"
                                            style={{
                                                height: 13,
                                            }}
                                        />
                                    )}
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                {subscription == 'premium' && (
                    <View
                        style={{
                            backgroundColor: 'black',
                            width: '100%',
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <LinearGradient
                            colors={["#181880", "#010106", "#010106", "#000000"]}
                            location={[0, 0.1, 0.2, 1]}
                            style={{
                                position: "absolute",
                                width: windowWidth,
                                height: windowHeight,
                            }}
                        />
                        {verifyPremium && (
                            <View style={[style.form, {
                                paddingTop: (windowHeight * 20) /100
                            }]}>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    Now you have free membership bla bla bla Lorem ipsum dolor sit amet, tale falli euismod vix an, per hinc harum commune in. Cu vix wisi everti explicari, id his
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'blue',
                                        borderRadius: 100,
                                        overflow: 'hidden',
                                        height: (windowHeight * 7 ) / 100,
                                        marginTop: (windowHeight * 40 ) / 100,
                                    }}
                                    onPress={upgrade}
                                >
                                    <LinearGradient
                                        colors={['#2727F5', '#001671']}
                                        start={[0.0, 0.5]}
                                        end={[1.0, 0.5]}
                                        style={{
                                            position: 'absolute',
                                            width: windowWidth,
                                            height: (windowHeight * 7 ) / 100,
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: 20,
                                        color: 'white',
                                    }}>Upgrade membership</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {selectPlan && (
                            <View style={[style.form, {
                                paddingTop: (windowHeight * 10) /100
                            }]}>
                                <Text style={{
                                    fontSize: 16,
                                    color: 'white',
                                    textAlign: 'center',
                                }}>
                                    Be a VO Premium member bla bla bla Lorem ipsum dolor sit amet, tale falli euismod vix an, per hinc harum commune in. Cu vix wisi everti explicari, id his
                                </Text>
                                <TouchableOpacity style={[style.plane, plane === 'monthly' ? style.planeSelected : style.plane]} onPress={selectPlane}>
                                    <Text style={style.planeName}>Monthly</Text>
                                    <Text style={style.planePrice}>$9.99</Text>
                                    <Text style={style.planeDesc}>Lorem ipsum dolor sit amet tale falli euismod</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[style.plane, plane === 'annually' ? style.planeSelected : style.plane]} onPress={selectPlane}>
                                    <Text style={style.planeName}>Annually</Text>
                                    <Text style={style.planePrice}>$69.00</Text>
                                    <Text style={style.planeDesc}>Lorem ipsum dolor sit amet tale falli euismod</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        backgroundColor: 'blue',
                                        borderRadius: 100,
                                        overflow: 'hidden',
                                        height: (windowHeight * 7 ) / 100,
                                        marginTop: (windowHeight * 10) /100,
                                        marginBottom: 20
                                    }}
                                    onPress={upgrade}
                                >
                                    <LinearGradient
                                        colors={['#2727F5', '#001671']}
                                        start={[0.0, 0.5]}
                                        end={[1.0, 0.5]}
                                        style={{
                                            position: 'absolute',
                                            width: windowWidth,
                                            height: (windowHeight * 7 ) / 100,
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: 20,
                                        color: 'white',
                                    }}>Become a premium member</Text>
                                </TouchableOpacity>
                                <View style={style.forgotPass}>
                                    <TouchableWithoutFeedback onPress={goToPrivacyPolicy}>
                                        <Text
                                            style={style.link}
                                        >Privacy Policy</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}
