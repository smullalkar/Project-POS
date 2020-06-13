import {
    LOGIN_USER_REQ,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    REGISTER_USER_REQ,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    GET_INVENTORY_REQ,
    GET_INVENTORY_SUCCESS,
    GET_INVENTORY_FAIL,
    GET_CUSTOMER_REQ,
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_FAIL,
    GET_SUPPLIER_REQ,
    GET_SUPPLIER_SUCCESS,
    GET_SUPPLIER_FAIL
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

export const getInventoryReq = payload => ({
    type: GET_INVENTORY_REQ,
    payload: payload
})

export const getInventorySuccess = payload => ({
    type: GET_INVENTORY_SUCCESS,
    payload: payload
})

export const getInventoryFail = payload => ({
    type: GET_INVENTORY_FAIL,
    payload: payload
})

export const getCustomerReq = payload => ({
    type: GET_CUSTOMER_REQ,
    payload: payload
})

export const getCustomerSuccess = payload => ({
    type: GET_CUSTOMER_SUCCESS,
    payload: payload
})

export const getCustomerFail = payload => ({
    type: GET_CUSTOMER_FAIL,
    payload: payload
})

export const getSupplierReq = payload => ({
    type: GET_SUPPLIER_REQ,
    payload: payload
})

export const getSupplierSuccess = payload => ({
    type: GET_SUPPLIER_SUCCESS,
    payload: payload
})

export const getSupplierFail = payload => ({
    type: GET_SUPPLIER_FAIL,
    payload: payload
})

export const geInventorytData = (payload) => {
    return dispatch => {
        dispatch(getInventoryReq());
        return axios
            .get(`http://127.0.0.1:5000/user/inventory/${payload}`)
            .then(res => {
                return dispatch(getInventorySuccess(res));
            })
            .catch(err => dispatch(getInventoryFail(err)));
    }
}

export const getCustomerData = (payload) => {
    return dispatch => {
        dispatch(getCustomerReq());
        return axios
            .get(`http://127.0.0.1:5000/user/customer/${payload}`)
            .then(res => {
                return dispatch(getCustomerSuccess(res));
            })
            .catch(err => dispatch(getCustomerFail(err)));
    }
}

export const getSupplierData = (payload) => {
    return dispatch => {
        dispatch(getSupplierReq());
        return axios
            .get(`http://127.0.0.1:5000/user/supplier`)
            .then(res => {
                return dispatch(getSupplierSuccess(res));
            })
            .catch(err => dispatch(getSupplierFail(err)));
    }
}

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