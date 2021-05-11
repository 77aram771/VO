import React, {useState} from "react"
import {TextInput} from "react-native"

export const PassCodeInput = ({color, index}) => {

    const [passwordType, setPasswordType] = useState(true)

    const nextInput = () => {

    }

    return (
        <TextInput
            onChangeText={nextInput}
            keyboardType='numeric'
            maxLength="1"
            style={[
                style.codeInput,
                {
                    borderColor: color,
                }
            ]}
        />
    );
};



