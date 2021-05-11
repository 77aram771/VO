import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {LogInScreen} from "../../screens/LogInScreen"
import {Register} from "../../screens/LogInScreen/Register"

const LogIn = createStackNavigator()

const LogInStackScreen = () => (
    <LogIn.Navigator headerMode="none" lazy={true}>
        <LogIn.Screen name="LoginScreen" component={LogInScreen}/>
        <LogIn.Screen name="RegisterScreen" component={Register}/>
    </LogIn.Navigator>
)

export default LogInStackScreen
