import {
    LOGIN_USER_REQ,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQ,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL
} from "./Actiontypes";

import axios from 'axios'

export const logUserReq = payload => ({
    type: LOGIN_USER_REQ,
    payload: payload
})

export const logUserSuccess = payload => ({
    type: LOGIN_USER_SUCCESS,
    payload: payload
})

export const logUserFail = payload => ({
    type: LOGIN_USER_FAIL,
    payload: payload
})

export const regUserReq = payload => ({
    type: REGISTER_USER_REQ,
    payload: payload
})

export const regUserSuccess = payload => ({
    type: REGISTER_USER_SUCCESS,
    payload: payload
})

export const regUserFail = payload => ({
    type: REGISTER_USER_FAIL,
    payload: payload
})

export const registerUser = (payload) => {
    console.log(payload)
    return dispatch => {
        dispatch(regUserReq());
        return axios
            .post(`http://127.0.0.1:5000/user/register`,
                {
                    uname : payload.uname,
                    address : payload.address,
                    contact : payload.contact,
                    email : payload.email,
                    password: payload.password
                }
            )
            .then(res => {
                return dispatch(regUserSuccess(res));
            })
            .catch(err => dispatch(regUserFail(err)));
    };
};

export const loginUser = (payload) => dispatch => {
    console.log('login details', payload)
    dispatch(logUserReq(payload))
    return axios.post("http://127.0.0.1:5000/user/login", {
        email: payload.email,
        password: payload.password
    })
        .then(res => res.data?.auth_token)
        .then(res => axios.post("http://127.0.0.1:5000/auth_check", {
            auth_token: res
        }))
        .then(res => dispatch(logUserSuccess(res)))
        .catch(err => dispatch(logUserFail(err)))
}