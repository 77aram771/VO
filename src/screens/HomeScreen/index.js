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

    const handleChangeFollow = () => {
        setChangeFollow(!changeFollow)
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
                                handleCloseSubModal={handleCloseSubModal}
                                subModalVisible={subModalVisible}
                                sectionId={sectionId}
                                subModalData={subModalData}
                                changeSubModal={changeSubModal}
                                changeFullScreen={changeFullScreen}
                                changeFollow={changeFullScreen}
                                handleChangeSelect={handleChangeSelect}
                                handleChangeSectionModal={handleChangeSectionModal}
                                handleChangeFollow={handleChangeFollow}
                            />
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
