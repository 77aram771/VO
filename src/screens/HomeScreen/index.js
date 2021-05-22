import React, {useState, useContext} from "react"
import {View, Text, ScrollView, TouchableOpacity, Image} from "react-native"
import GestureRecognizer from 'react-native-swipe-gestures'
import ModalWrapper from "react-native-modal-wrapper"
import {LinearGradient} from "expo-linear-gradient"
import Icon, {
    ICON_CHECK,
    ICON_INFO,
    ICON_LIKE,
    ICON_SHARE,
    ICON_USER,
    ICON_WATCH,
    ICON_PLUS,
    ICON_ARROW_DOWN_FOLLOW
} from "../../shared/MockData"
import Context from "../../../Context"
import VideoPlayer from "../../components/VideoPlayer"
import {styles} from "./style"
import {windowHeight, windowWidth} from "../../shared/Const"

const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
}

export function HomeScreen({navigation}) {

    const {fullScreen} = useContext(Context)
    const [changeFullScreen, setChangeFullScreen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [subModalData, setSubModalData] = useState([
        {
            id: 1,
            title: 'Quality',
            items: [
                {
                    id: 1,
                    item: 'Auto(720p)',
                    bool: true
                },
                {
                    id: 2,
                    item: '1080p',
                    bool: false
                },
                {
                    id: 3,
                    item: '720p',
                    bool: false
                },
                {
                    id: 4,
                    item: '480p',
                    bool: false
                },
                {
                    id: 5,
                    item: '360p',
                    bool: false
                },
                {
                    id: 6,
                    item: '240p',
                    bool: false
                },
                {
                    id: 7,
                    item: '144p',
                    bool: false
                },
            ],
            bool: false,
            icon: new Icon(
                require("../../assets/icon/icon-quality.png"),
                16,
                15
            )
        },
        {
            id: 2,
            title: 'Captions',
            items: [
                {
                    id: 1,
                    item: 'Off',
                    bool: true
                },
                {
                    id: 2,
                    item: 'English',
                    bool: false
                },
                {
                    id: 3,
                    item: 'French',
                    bool: false
                },
                {
                    id: 4,
                    item: 'Arabic',
                    bool: false
                }
            ],
            bool: false,
            icon: new Icon(
                require("../../assets/icon/icon-captions.png"),
                16,
                14
            )
        },
        {
            id: 3,
            title: 'Sound Channel',
            items: [
                {
                    id: 1,
                    item: 'Main (Arabic)',
                    bool: true
                },
                {
                    id: 2,
                    item: 'English',
                    bool: false
                },
            ],
            bool: false,
            icon: new Icon(
                require("../../assets/icon/icon-sound.png"),
                18,
                15
            )
        },
        {
            id: 4,
            title: 'Report',
            items: [
                {
                    id: 1,
                    item: 'Sexual content',
                    bool: true
                },
                {
                    id: 2,
                    item: 'Child abuse',
                    bool: false
                },
                {
                    id: 3,
                    item: 'Sexual content',
                    bool: false
                },
                {
                    id: 4,
                    item: 'Child abuse',
                    bool: false
                },
                {
                    id: 5,
                    item: 'Sexual content',
                    bool: false
                },
                {
                    id: 6,
                    item: 'Child abuse',
                    bool: false
                },
                {
                    id: 7,
                    item: 'Other',
                    bool: false
                },
            ],
            bool: false,
            icon: new Icon(
                require("../../assets/icon/icon-report.png"),
                13,
                15
            )
        }
    ])
    const [subModalVisible, setSubModalVisible] = useState(false)
    const [changeModal, setChangeModal] = useState(false)
    const [changeSubModal, setChangeSubModal] = useState(false)
    const [sectionId, setSectionId] = useState(null)
    const [changeFollow, setChangeFollow] = useState(null)

    const onSwipeUp = (gestureState) => {
        console.log('test UP')
        handleChangeModal()
    }

    const onSwipeDown = (gestureState) => {
        console.log('test DOWN')
        handleChangeModal()
    }

    const handleOpenModal = () => {
        setModalVisible(true)
        setChangeModal(false)
    }

    const handleCloseModal = () => {
        setModalVisible(false)
        setChangeModal(false)
    }

    const handleChangeModal = () => {
        setChangeModal(!changeModal)
        console.log('changeModal', changeModal)
    }

    const handleOpenSubModal = () => {
        console.log('sub Modal open')
        setSubModalVisible(true)
    }

    const handleCloseSubModal = () => {
        setChangeSubModal(false)
        setSubModalVisible(!subModalVisible)
    }

    const handleChangeSectionModal = (id) => {
        setSectionId(id)
        setTimeout(() => {
            console.log('id', id)
            setChangeSubModal(!changeSubModal)
        }, 300)
    }

    const handleChangeSelect = (id) => {
        console.log('id', id);
        // setSubModalData(subModalData[sectionId].items.map(item => {
        //     console.log('item', item)
        //     item.bool = false
        //     if (item.id === id) {
        //         item.bool = !item.bool
        //     }
        //     return item;
        // }))
        setChangeSubModal(!changeSubModal)


        let newObj = subModalData[sectionId].items.map(item => {
            console.log('item', item)
            item.bool = false
            if (item.id === id) {
                item.bool = !item.bool
            }
            return item
        })
        // setSubModalData(newObj)
        setSectionId(null)
        console.log('newObj', newObj)
    }

    const handleFullScreen = () => {
        setChangeFullScreen(!changeFullScreen)
    }

    return (
        <>
            <ModalWrapper
                supportedOrientations={['portrait', 'landscape']}
                isNative={!changeModal}
                onRequestClose={handleCloseModal}
                position='bottom'
                shouldAnimateOnRequestClose={true}
                showOverlay={false}
                style={changeModal ? (() => {
                    return {
                        bottom: 0,
                    };
                })() : {}}
                visible={modalVisible}
            >
                <ModalWrapper
                    containerStyle={{flexDirection: 'row', alignItems: 'flex-end'}}
                    onRequestClose={handleCloseSubModal}
                    style={{
                        flex: 1,
                        borderTopRightRadius: 18,
                        borderTopLeftRadius: 18,
                        backgroundColor: '#161827',
                    }}
                    visible={subModalVisible}
                >
                    <View style={{
                        width: '100%',
                        minHeight: windowHeight / 3.5,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingBottom: 30,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        {
                            sectionId === 3
                                ? (
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: '#A4AEB4',
                                            margin: 25
                                        }}
                                    >
                                        {subModalData[sectionId].title}
                                    </Text>
                                )
                                : null
                        }
                        {
                            !changeSubModal
                                ? (
                                    subModalData.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={item.id}
                                                style={{
                                                    width: windowWidth / 1.25,
                                                    height: 40,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    borderBottomStyle: 'solid',
                                                    borderBottomColor: '#22242C',
                                                    borderBottomWidth: 1
                                                }}
                                                onPress={() => handleChangeSectionModal(index)}
                                            >
                                                <Image
                                                    style={{
                                                        marginRight: 20
                                                    }}
                                                    source={item.icon.module}
                                                />
                                                <Text style={{fontSize: 16, color: '#A2ACB2'}}>
                                                    {item.title}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                )
                                : (
                                    subModalData[sectionId].items.map(item => {
                                        return (
                                            <View key={item.id}>
                                                <TouchableOpacity
                                                    key={item.id}
                                                    style={{
                                                        width: windowWidth / 1.25,
                                                        height: 40,
                                                        marginTop: 10,
                                                        marginBottom: 10,
                                                        justifyContent: 'flex-start',
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        borderBottomStyle: 'solid',
                                                        borderBottomColor: '#22242C',
                                                        borderBottomWidth: 1
                                                    }}
                                                    onPress={() => handleChangeSelect(item.id)}
                                                >
                                                    <View style={{width: 10}}>
                                                        {
                                                            item.bool
                                                                ? (
                                                                    <Image source={ICON_CHECK.module}/>
                                                                )
                                                                : null
                                                        }
                                                    </View>

                                                    <Text
                                                        style={{
                                                            marginLeft: 40,
                                                            fontSize: 16,
                                                            color: '#A2ACB2',
                                                        }}>
                                                        {item.item}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                )
                        }
                        {
                            sectionId === 3
                                ? (
                                    <>
                                        <TouchableOpacity
                                            style={{
                                                width: 185,
                                                height: 36,
                                                marginTop: 25,
                                                marginBottom: 25,
                                                borderRadius: 25
                                            }}
                                        >
                                            <LinearGradient
                                                colors={['#2727F5', '#001671']}
                                                style={{flex: 1, borderRadius: 25}}
                                                start={{x: 0, y: 0}}
                                                end={{x: 1, y: 0}}
                                            >

                                                <Text style={styles.buttonText}>
                                                    Report
                                                </Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                width: 185,
                                                height: 36,
                                                marginBottom: 10
                                            }}
                                        >
                                            <Text style={styles.buttonText}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )
                                : null
                        }
                    </View>
                </ModalWrapper>
                <GestureRecognizer
                    // onSwipe={(direction, state) => onSwipe(direction, state)}
                    onSwipeUp={(state) => onSwipeUp(state)}
                    onSwipeDown={(state) => onSwipeDown(state)}
                    // onSwipeLeft={(state) => onSwipeLeft(state)}
                    // onSwipeRight={(state) => onSwipeRight(state)}
                    config={config}
                    style={changeModal
                        ? {
                            height: windowHeight / 10,
                            backgroundColor: '#000'
                        }
                        : {
                            backgroundColor: '#000'
                        }
                    }
                >
                    <View style={[styles.centeredView]}>
                        <View
                            style={[
                                styles.modalView,
                                {
                                    height: changeModal ? windowHeight / 10 : '100%',
                                    backgroundColor: '#000'
                                }
                            ]}
                        >
                            <VideoPlayer
                                closeModal={handleCloseModal}
                                openSubModal={handleOpenSubModal}
                                changeModal={handleChangeModal}
                                changeFullScree={handleFullScreen}
                                openModalTrigger={modalVisible}
                                changeModalTrigger={changeModal}
                                fullScreenTrigger={changeFullScreen}
                            />
                            {
                                !changeFullScreen
                                    ? (
                                        <View
                                            style={{
                                                flex: 3,
                                                width: windowWidth,
                                            }}
                                        >
                                            <View
                                                style={{
                                                    width: windowWidth,
                                                    height: 60,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 3,
                                                        borderRightColor: '#797C89',
                                                        borderRightWidth: .5,
                                                        borderRightStyle: 'solid'
                                                    }}
                                                >
                                                    <Image source={ICON_LIKE.module}/>
                                                    <Text
                                                        style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Like</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 3,
                                                        borderRightColor: '#797C89',
                                                        borderRightWidth: .5,
                                                        borderRightStyle: 'solid'
                                                    }}
                                                >
                                                    <Image source={ICON_SHARE.module}/>
                                                    <Text
                                                        style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Share</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 3,
                                                        borderRightColor: '#797C89',
                                                        borderRightWidth: .5,
                                                        borderRightStyle: 'solid'
                                                    }}
                                                >
                                                    <Image source={ICON_WATCH.module}/>
                                                    <Text style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Watch
                                                        Later</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingHorizontal: 15,
                                                        paddingVertical: 3,
                                                    }}
                                                >
                                                    <Image source={ICON_INFO.module}/>
                                                    <Text
                                                        style={{fontSize: 15, color: '#797C89', marginLeft: 3}}>Info</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View
                                                style={{
                                                    width: windowWidth,
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'flex-start',
                                                    paddingLeft: 10,
                                                    paddingRight: 10,
                                                    marginBottom: 30
                                                }}
                                            >
                                                <Text
                                                    style={{fontSize: 17, color: '#fff'}}
                                                >
                                                    Stranger Things
                                                </Text>
                                                <Text
                                                    style={{fontSize: 13, color: '#fff'}}
                                                >
                                                    When a young boy vanishes, a small town uncovers a mystery involving
                                                    secret experiments, terrifying supernatural forces and one strange
                                                    little girl.
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    width: windowWidth,
                                                    height: 60,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderTopWidth: 1,
                                                    borderBottomWidth: 1,
                                                    borderColor: '#797C89'
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        paddingLeft: 10,
                                                        paddingRight: 10,
                                                    }}
                                                >
                                                    <Image source={ICON_USER.module}/>
                                                    <View
                                                        style={{
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'space-between',
                                                            marginLeft: 10,
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'flex-start',
                                                                justifyContent: 'flex-start',
                                                            }}
                                                        >
                                                            <Text style={{fontSize: 14, color: '#fff'}}>
                                                                Zaid AI-Hussair
                                                            </Text>

                                                            <View
                                                                style={{
                                                                    height: 17,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <LinearGradient
                                                                    colors={['#2727F5', '#001671']}
                                                                    style={{
                                                                        flex: 1,
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        borderRadius: 10,
                                                                        padding: 4
                                                                    }}
                                                                    start={{x: 0, y: 0}}
                                                                    end={{x: 1, y: 0}}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 8,
                                                                            color: '#fff',
                                                                        }}
                                                                    >
                                                                        CONTRIBUTOR
                                                                    </Text>
                                                                </LinearGradient>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'flex-start',
                                                                justifyContent: 'flex-start',
                                                            }}
                                                        >
                                                            <Text
                                                                style={{color: '#A4AEB4', fontSize: 12}}
                                                            >
                                                                410 Videos. 66K Followers
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                {
                                                    changeFollow
                                                        ? (
                                                            <TouchableOpacity
                                                                style={{
                                                                    width: 80,
                                                                    height: 28,
                                                                }}
                                                                onPress={() => setChangeFollow(!changeFollow)}
                                                            >
                                                                <LinearGradient
                                                                    colors={['#2727F5', '#001671']}
                                                                    style={{
                                                                        flex: 1,
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        borderRadius: 15,
                                                                        padding: 4
                                                                    }}
                                                                    start={{x: 0, y: 0}}
                                                                    end={{x: 1, y: 0}}
                                                                >
                                                                    <Image source={ICON_PLUS.module}/>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 13,
                                                                            color: '#fff',
                                                                            marginLeft: 5
                                                                        }}
                                                                    >
                                                                        Follow
                                                                    </Text>
                                                                </LinearGradient>
                                                            </TouchableOpacity>
                                                        )
                                                        : (
                                                            <TouchableOpacity
                                                                style={{
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    width: 85,
                                                                    height: 28,
                                                                    borderRadius: 15,
                                                                    borderStyle: 'solid',
                                                                    borderWidth: 1,
                                                                    borderColor: '#797C89'
                                                                }}
                                                                onPress={() => setChangeFollow(!changeFollow)}
                                                            >
                                                                <Text
                                                                    style={{
                                                                        fontSize: 13,
                                                                        color: '#A4AEB4',
                                                                        marginRight: 5
                                                                    }}
                                                                >
                                                                    Following
                                                                </Text>
                                                                <Image source={ICON_ARROW_DOWN_FOLLOW.module}/>
                                                            </TouchableOpacity>
                                                        )
                                                }
                                            </View>
                                        </View>
                                    )
                                    : null
                            }
                        </View>
                    </View>
                </GestureRecognizer>
            </ModalWrapper>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                style={{
                    flex: 1,
                    backgroundColor: '#000'
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: '#000',
                        width: '100%',
                    }}
                >
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={handleOpenModal}
                    >
                        <Text style={styles.textStyle}>Show Modal</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}
