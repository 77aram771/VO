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
// import {style} from "../ProfileScreen/EditProfile/style";
// import {LinearGradient} from "expo-linear-gradient";
// import {Topics} from "../../components/UI/Topics"

// const DATA = [
//     {
//         id: "1",
//         name: "All",
//         selected: true,
//     },
//     {
//         id: "2",
//         name: "Music",
//         selected: false,
//     },
//     {
//         id: "3",
//         name: "Shows",
//         selected: false,
//     },
//     {
//         id: "4",
//         name: "Movies",
//         selected: false,
//     },
//     {
//         id: "5",
//         name: "Sport",
//         selected: false,
//     },
//     {
//         id: "6",
//         name: "Popular",
//         selected: false,
//     }
// ];


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
    // const [items, setItems] = useState(DATA)

    // const setSelectedTopics = (prop) => {
    //     let topics = [...items];
    //     if (prop === 1) {
    //         for (let data of topics) {
    //             data.selected = data.selected == null ? false : false;
    //         }
    //         // topics[0].selected = true
    //     }
    //     console.log(topics)
    //     // for (let data of topics) {
    //     //     console.log(prop)
    //     //     if (prop == 1) {
    //     //         console.log('false')
    //     //         data.selected = data.selected == null ? false : false;
    //     //
    //     //         break;
    //     //     } else if (data.id === prop) {
    //     //         data.selected = data.selected == null ? true : !data.selected;
    //     //
    //     //         break;
    //     //     }
    //     // }
    //     topics.forEach((topic) => {
    //         if (topic.selected !== undefined) {
    //             if (topic.selected === true) {
    //                 // this.btnDisabled = 0;
    //             } else if (topic.selected === false) {
    //                 // this.btnDisabled = 1;
    //             }
    //         }
    //     });
    //     setItems(topics)
    // }

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
        // setChangeSubModal(!changeSubModal)
        // let newObj = subModalData[sectionId].items.map(item => {
        //     item.bool = false
        //     if (item.id === id) {
        //         item.bool = !item.bool
        //     }
        //     return item
        // })
        // // setSubModalData(newObj)
        // setSectionId(null)
        // console.log('newObj', newObj)
        setChangeSubModal(!changeSubModal)
        subModalData[sectionId].items.map(item => {
            item.bool = false
            if (item.id === id) {
                item.bool = !item.bool
            }
            return item
        })
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
        subModalData[sectionId].items.map(item => {
            item.bool = false
            if (item.id === id) {
                item.bool = !item.bool
            }
            return item
        })
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
                {/*<View style={style.container}>*/}
                {/*    <LinearGradient*/}
                {/*        colors={["#080836", "#000000", "#000000", "#000000"]}*/}
                {/*        location={[0, 0.1, 0.4, 1]}*/}
                {/*        style={{*/}
                {/*            position: "absolute",*/}
                {/*            width: windowWidth,*/}
                {/*            height: windowHeight,*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <Topics handlePress={setSelectedTopics} items={items}/>*/}
                {/*</View>*/}
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
