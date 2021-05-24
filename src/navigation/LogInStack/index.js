import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {LogInScreen} from "../../screens/LogInScreen"
import {Register} from "../../screens/LogInScreen/Register"
import {ForgotPass} from "../../screens/LogInScreen/ForgotPass"
import {Congratulations} from "../../screens/LogInScreen/Congratulations"
import {ProfileInfo} from "../../screens/LogInScreen/ProfileInfo"
import {ProfilePic} from "../../screens/LogInScreen/ProfilePic"
import {Topic} from "../../screens/LogInScreen/Topic"
import {ConfirmReg} from "../../screens/LogInScreen/ConfirmReg";
import {MissingCont} from "../../screens/LogInScreen/MissingCont";


const LogIn = createStackNavigator()

const LogInStackScreen = () => (
    <LogIn.Navigator headerMode="none" lazy={true}>
        <LogIn.Screen name="LoginScreen" component={LogInScreen}/>
        <LogIn.Screen name="RegisterScreen" component={Register}/>
        <LogIn.Screen name="ForgotPassScreen" component={ForgotPass}/>
        <LogIn.Screen name="CongratulationsScreen" component={Congratulations}/>
        <LogIn.Screen name="ConfirmRegScreen" component={ConfirmReg}/>
        <LogIn.Screen name="ProfileInfoScreen" component={ProfileInfo}/>
        <LogIn.Screen name="ProfilePicScreen" component={ProfilePic}/>
        <LogIn.Screen name="TopicScreen" component={Topic}/>
        <LogIn.Screen name="MissingContScreen" component={MissingCont}/>
    </LogIn.Navigator>
)

export default LogInStackScreen
