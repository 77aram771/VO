import React, {useEffect, useState} from 'react'
import {View, Image, LogBox, SafeAreaView, YellowBox} from 'react-native'
import RootNavigation from "./src/navigation"
import {Provider} from 'react-redux'
import {store} from './src/store'
import {windowHeight, windowWidth} from "./src/shared/Const"
import {StatusBar} from "expo-status-bar";

// LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

export default function App() {

    const [isReady, useIsReady] = useState(true)

    useEffect(() => {
        setTimeout(async () => {
            await useIsReady(false)
        }, 5000)
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver, loadAsync`']);

    }, [])

    if (isReady) {
        return (
            <View style={{flex: 1}}>
                <Image
                    source={require('./src/assets/img/splashScreen.png')}
                    style={{width: windowWidth, height: windowHeight}}
                    resizeMode={'cover'}
                />
            </View>
        )
    }

    return (
        <>
            <StatusBar style="light"/>
            <Provider store={store}>
                <RootNavigation/>
            </Provider>
        </>

    )
}
