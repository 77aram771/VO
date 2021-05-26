import React, {useState, useContext} from "react"
import {View, Text, ScrollView, TouchableOpacity, Modal} from "react-native"
import GestureRecognizer from 'react-native-swipe-gestures'
import ModalWrapper from "react-native-modal-wrapper"
import {config, videoSubModalObject} from "../../shared/MockData"
import VideoPlayer from "../../components/VideoPlayer"
import {styles} from "./style"
import {windowHeight} from "../../shared/Const"
import {Notifications} from "./Notifications"
import Context from "../../../Context"


export function HomeScreen({navigation}) {

    const [changeFullScreen, setChangeFullScreen] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [subModalData, setSubModalData] = useState(videoSubModalObject)
    const [subModalVisible, setSubModalVisible] = useState(false)
    const [subModalVisibleFullScreen, setSubModalVisibleFullScreen] = useState(false)
    const [changeModal, setChangeModal] = useState(false)
    const [changeSubModal, setChangeSubModal] = useState(false)
    const [changeSubModalFullScreen, setChangeSubModalFullScreen] = useState(false)
    const [sectionId, setSectionId] = useState(null)
    const [sectionIdFullScreen, setSectionIdFullScreen] = useState(0)
    const [changeFollow, setChangeFollow] = useState(null)
    const {notModalVisible} = useContext(Context)


    const onSwipeUp = () => {
        console.log('test UP')
        handleChangeModal()
    }

    const onSwipeDown = () => {
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
    }

    const handleOpenSubModal = () => {
        setSubModalVisible(true)
    }

    const handleCloseSubModal = () => {
        setChangeSubModal(false)
        setSubModalVisible(!subModalVisible)
        setSectionId(null)
    }
    const handleOpenSubModalFullScreen = () => {
        setSubModalVisibleFullScreen(true)
    }

    const handleCloseSubModalFullScreen = (bool) => {
        setChangeSubModalFullScreen(false)
        setSubModalVisibleFullScreen(bool)
        // setSectionIdFullScreen(0)
    }

    const handleChangeSectionModalFullScreen = (id) => {
        setSubModalVisibleFullScreen(true)
        setSectionIdFullScreen(id)
        setTimeout(() => {
            console.log('id', id)
            setChangeSubModalFullScreen(!changeSubModalFullScreen)
        }, 300)
    }

    const handleChangeSectionModal = (id) => {
        setSectionId(id)
        setTimeout(() => {
            console.log('id', id)
            setChangeSubModal(!changeSubModal)
        }, 300)
    }

    const handleChangeSelect = (id) => {
        setChangeSubModal(!changeSubModal)
        let newObj = subModalData[sectionId].items.map(item => {
            item.bool = false
            if (item.id === id) {
                item.bool = !item.bool
            }
            return item
        })
        // setSubModalData(newObj)
        // setSectionIdFullScreen(0)
        console.log('newObj', newObj)
    }

    const handleChangeSelectFullScreen = (id) => {
        setChangeSubModalFullScreen(!changeSubModalFullScreen)
        let newObj = subModalData[sectionIdFullScreen].items.map(item => {
            item.bool = false
            if (item.id === id) {
                item.bool = !item.bool
            }
            return item
        })
        // setSubModalData(newObj)
        // setSectionIdFullScreen(0)
        console.log('newObj', newObj)
    }

    const handleChangeSelectRadio = (id) => {
        // setChangeSubModal(!changeSubModal)
        let newObj = subModalData[sectionId].items.map(item => {
            item.bool = false
            if (item.id === id) {
                item.bool = !item.bool
            }
            return item
        })
        // setSubModalData(newObj)
        // setSectionIdFullScreen(0)
        console.log('newObj', newObj)
    }

    const handleChangeSelectRadioFullScreen = (id) => {
        setChangeSubModalFullScreen(!changeSubModalFullScreen)
        let newObj = subModalData[sectionIdFullScreen].items.map(item => {
            item.bool = false
            if (item.id === id) {
                item.bool = !item.bool
            }
            return item
        })
        // setSubModalData(newObj)
        // setSectionIdFullScreen(0)
        console.log('newObj', newObj)
    }

    const handleFullScreen = () => setChangeFullScreen(!changeFullScreen)

    const handleChangeFollow = () => setChangeFollow(!changeFollow)

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={notModalVisible}
                onRequestClose={() => {alert('Modal has been closed.')}}
                supportedOrientations={['portrait', 'landscape']}
                presentationStyle="overFullScreen"
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Notifications/>
                    </View>
                </View>
            </Modal>
            <ModalWrapper
                supportedOrientations={['portrait', 'landscape']}
                isNative={!changeModal}
                onRequestClose={handleCloseModal}
                position='bottom'
                shouldAnimateOnRequestClose={true}
                showOverlay={false}
                visible={modalVisible}
                style={changeModal
                    ? {
                        alignSelf: 'flex-end',
                        height: windowHeight / 10,
                        backgroundColor: '#000',
                    }
                    : {
                        backgroundColor: '#000',
                    }
                }
            >
                {/*<GestureRecognizer*/}
                {/*    // onSwipe={(direction, state) => onSwipe(direction, state)}*/}
                {/*    onSwipeUp={(state) => onSwipeUp(state)}*/}
                {/*    onSwipeDown={(state) => onSwipeDown(state)}*/}
                {/*    // onSwipeLeft={(state) => onSwipeLeft(state)}*/}
                {/*    // onSwipeRight={(state) => onSwipeRight(state)}*/}
                {/*    config={config}*/}
                {/*    style={changeModal*/}
                {/*        ? {*/}
                {/*            alignSelf: 'flex-end',*/}
                {/*            height: windowHeight / 10,*/}
                {/*            backgroundColor: '#000',*/}
                {/*        }*/}
                {/*        : {*/}
                {/*            backgroundColor: '#000',*/}
                {/*        }*/}
                {/*    }*/}
                {/*>*/}
                {/*    <View style={[styles.centeredView]}>*/}
                {/*        <View*/}
                {/*            style={[*/}
                {/*                styles.modalView,*/}
                {/*                {*/}
                {/*                    height: changeModal ? windowHeight / 10 : '100%',*/}
                {/*                }*/}
                {/*            ]}*/}
                {/*        >*/}
                {/*            <VideoPlayer*/}
                {/*                changeModalTrigger={changeModal}*/}
                {/*                subModalVisible={subModalVisible}*/}
                {/*                sectionId={sectionId}*/}
                {/*                subModalData={subModalData}*/}
                {/*                changeSubModal={changeSubModal}*/}
                {/*                changeFullScreen={changeFullScreen}*/}
                {/*                changeFollow={changeFollow}*/}
                {/*                closeModal={handleCloseModal}*/}
                {/*                openSubModal={handleOpenSubModal}*/}
                {/*                changeModal={handleChangeModal}*/}
                {/*                changeFullScree={handleFullScreen}*/}
                {/*                handleCloseSubModal={handleCloseSubModal}*/}
                {/*                handleChangeSelect={handleChangeSelect}*/}
                {/*                handleChangeSectionModal={handleChangeSectionModal}*/}
                {/*                handleChangeFollow={handleChangeFollow}*/}
                {/*                handleChangeSelectRadio={handleChangeSelectRadio}*/}
                {/*            />*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</GestureRecognizer>*/}
                <View style={[styles.centeredView]}>
                    <View
                        style={[
                            styles.modalView,
                            {
                                height: changeModal ? windowHeight / 10 : '100%',
                            }
                        ]}
                    >
                        <VideoPlayer
                            changeModalTrigger={changeModal}
                            subModalVisible={subModalVisible}
                            sectionId={sectionId}
                            subModalData={subModalData}
                            changeSubModal={changeSubModal}
                            changeFullScreen={changeFullScreen}
                            changeFollow={changeFollow}
                            subModalVisibleFullScreen={subModalVisibleFullScreen}
                            sectionIdFullScreen={sectionIdFullScreen}
                            changeSubModalFullScreen={changeSubModalFullScreen}
                            closeModal={handleCloseModal}
                            openSubModal={handleOpenSubModal}
                            changeModal={handleChangeModal}
                            handleFullScreen={handleFullScreen}
                            handleCloseSubModal={handleCloseSubModal}
                            handleChangeSelect={handleChangeSelect}
                            handleChangeSectionModal={handleChangeSectionModal}
                            handleChangeFollow={handleChangeFollow}
                            handleChangeSelectRadio={handleChangeSelectRadio}
                            handleOpenSubModalFullScreen={handleOpenSubModalFullScreen}
                            handleCloseSubModalFullScreen={handleCloseSubModalFullScreen}
                            handleChangeSectionModalFullScreen={handleChangeSectionModalFullScreen}
                            handleChangeSelectFullScreen={handleChangeSelectFullScreen}
                            handleChangeSelectRadioFullScreen={handleChangeSelectRadioFullScreen}
                        />
                    </View>
                </View>
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
