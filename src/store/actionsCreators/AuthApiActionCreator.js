import axios from 'axios'
import {fetchData, fetchSuccess, fetchError} from '../actions/AuthApiAction'
import {AsyncStorage} from "react-native";

export const AuthApiActionCreatorPhone = (url) => (dispatch) => {
    dispatch(fetchData())
    return new Promise(() => {
        axios
            .post(url)
            .then((response) => {
                // dispatch(fetchSuccess(response.data))
                // console.log('response', response)
            })
            .catch((error) => {
                dispatch(fetchError(error))
                console.log(error)
            })
    })
}

export const AuthApiActionCreatorCode = (url) => (dispatch) => {
    dispatch(fetchData())
    return new Promise(() => {
        axios
            .post(url)
            .then((response) => {
                dispatch(fetchSuccess(response.data))
            })
            .catch((error) => {
                dispatch(fetchError(error))
                console.log(error)
            })
    })
}

export const AuthLogOut = (url) => async (dispatch) => {
    // const token = await AsyncStorage.getItem("Token");
    dispatch(fetchData())
    dispatch(null)
    // return new Promise(() => {
    //     axios
    //         .post(url, {headers: {'Authorization': `Bearer ${token}`}})
    //         .then((response) => {
    //             dispatch(null)
    //             console.log('response logout', response)
    //         })
    //         .catch((error) => {
    //             console.log('response error', error)
    //             dispatch(fetchError(error))
    //             console.log(error)
    //         })
    //
    // })
}


