import React, {useEffect, useState} from 'react'
import {View, Image, LogBox} from 'react-native'
import RootNavigation from "./src/navigation"
import {Provider} from 'react-redux'
import {store} from './src/store'
import {windowHeight, windowWidth} from "./src/shared/Const"

LogBox.ignoreLogs(['Warning: ...'])
LogBox.ignoreAllLogs()

export default function App() {

    const [isReady, useIsReady] = useState(true)

    useEffect(() => {
        setTimeout(async () => {
            await useIsReady(false)
        }, 5000)
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
        <Provider store={store}>
            <RootNavigation/>
        </Provider>
    )
}
