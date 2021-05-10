import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {LogInScreen} from "../../screens/LogInScreen"
import {SingInScreen} from "../../screens/LogInScreen/SingInScreen"
import {SingUpScreen} from "../../screens/LogInScreen/SingUpScreen"
import {ForgotPasswordScreen} from "../../screens/LogInScreen/ForgotPasswordScreen"

const LogIn = createStackNavigator()

const LogInStackScreen = () => (
    <LogIn.Navigator headerMode="none" lazy={true}>
        <LogIn.Screen name="LogInScreen" component={LogInScreen}/>
        <LogIn.Screen name="SingInScreen" component={SingInScreen}/>
        <LogIn.Screen name="SingUpScreen" component={SingUpScreen}/>
        <LogIn.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
    </LogIn.Navigator>
)

export default LogInStackScreen
