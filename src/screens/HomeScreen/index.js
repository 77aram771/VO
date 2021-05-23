import React, {useState, useContext} from "react"
import {View, Text, ScrollView, Button, Modal} from "react-native"
import {styles} from "./style"
import VideoPlayer from "../../components/VideoPlayer"
import Context from "../../../Context"
import {Notifications} from "../HomeScreen/Notifications"

export function HomeScreen({navigation}) {

    const {notModalVisible} = useContext(Context)

  

    return (
        <>
         <Modal
                animationType="slide"
                transparent={true}
                visible={notModalVisible}
                onRequestClose={() => {alert('Modal has been closed.')}}
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
                        <Notifications/>
                    </View>
                </View>
            </Modal>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ flex: 1,
                justifyContent: 'center',
                backgroundColor: '#ecf0f1'
            }}
            >
             

                {/*<Text>Home screen</Text>*/}
                {/*<Button*/}
                {/*    title="Go to Details"*/}
                {/*    onPress={() => navigation.navigate('Details')}*/}
                {/*/>*/}
                {/* <VideoPlayer/> */}
            </View>
        </ScrollView>
        </>
    )
}
