import React, {useState, useRef} from "react"
import {TextInput} from "react-native"
import {windowHeight} from "../../../shared/Const"
import {windowWidth} from "../../../shared/Const"

export const PassCodeInput = ({color, index, handleNextInput, refs}) => {



    return (
        <TextInput
            onChangeText={(text) => handleNextInput(index, text)}
            keyboardType='numeric'
            maxLength="1"
            ref={refs}
            style={
                {
                    padding: 5,
                    fontSize: 26,
                    width: windowWidth / 11,
                    height: windowHeight / 15,
                    marginRight: windowWidth / 40,
                    marginLeft: windowWidth / 40,
                    color: '#A4AEB4',
                    borderWidth: 2,
                    borderRadius: 10,
                    textAlign: 'center',
                    borderColor: color,
                }
            }
        />
    );
};



