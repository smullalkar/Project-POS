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
    GET_SUPPLIER_FAIL,
    ADDITEM_STOCK_REQ,
    ADDITEM_STOCK_SUCCESS,
    ADDITEM_STOCK_FAIL,
    ADDSUPPLIER_REQ,
    ADDSUPPLIER_SUCCESS,
    ADDSUPPLIER_FAIL,
    DELETESUPPLIER_REQ,
    DELETESUPPLIER_SUCCESS,
    DELETESUPPLIER_FAIL,
    DELETESTOCK_REQ,
    DELETESTOCK_SUCCESS,
    DELETESTOCK_FAIL,
    EDITSTOCK_REQ,
    EDITSTOCK_SUCCESS,
    EDITSTOCK_FAIL,
    EDITSUPPLIER_REQ,
    EDITSUPPLIER_SUCCESS,
    EDITSUPPLIER_FAIL,
    LOGOUT_USER
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

export const logout = payload => ({
    type: LOGOUT_USER,
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

export const addItemToStockReq = payload => ({
    type: ADDITEM_STOCK_REQ,
    payload: payload
})

export const addItemToStockSuccess = payload => ({
    type: ADDITEM_STOCK_SUCCESS,
    payload: payload
})

export const addItemToStockFail = payload => ({
    type: ADDITEM_STOCK_FAIL,
    payload: payload
})

export const addSupplierReq = payload => ({
    type: ADDSUPPLIER_REQ,
    payload: payload
})

export const addSupplierSuccess = payload => ({
    type: ADDSUPPLIER_SUCCESS,
    payload: payload
})

export const addSupplierFail = payload => ({
    type: ADDSUPPLIER_FAIL,
    payload: payload
})

export const deleteSupplierReq = payload => ({
    type: DELETESUPPLIER_REQ,
    payload: payload
})

export const deleteSupplierSuccess = payload => ({
    type: DELETESUPPLIER_SUCCESS,
    payload: payload
})

export const deleteSupplierFail = payload => ({
    type: DELETESUPPLIER_FAIL,
    payload: payload
})

export const deleteStockReq = payload => ({
    type: DELETESTOCK_REQ,
    payload: payload
})

export const deleteStockSuccess = payload => ({
    type: DELETESTOCK_SUCCESS,
    payload: payload
})

export const deleteStockFail = payload => ({
    type: DELETESTOCK_FAIL,
    payload: payload
})

export const editStockReq = payload => ({
    type: EDITSTOCK_REQ,
    payload: payload
})

export const editStockSuccess = payload => ({
    type: EDITSTOCK_SUCCESS,
    payload: payload
})

export const editStockFail = payload => ({
    type: EDITSTOCK_FAIL,
    payload: payload
})

export const editSupplierReq = payload => ({
    type: EDITSUPPLIER_REQ,
    payload: payload
})

export const editSupplierSuccess = payload => ({
    type: EDITSUPPLIER_SUCCESS,
    payload: payload
})

export const editSupplierFail = payload => ({
    type: EDITSUPPLIER_FAIL,
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
            .get(`http://127.0.0.1:5000/user/supplier/${payload}`)
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
                    uname: payload.uname,
                    address: payload.address,
                    contact: payload.contact,
                    email: payload.email,
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

export const addItemToStock = (payload) => {
    console.log(payload)
    return dispatch => {
        dispatch(addItemToStockReq());
        return axios
            .post(`http://127.0.0.1:5000/user/stock/add`,
                {
                    item_name: payload.item_name,
                    ppu: payload.ppu,
                    spu: payload.spu,
                    qty: payload.qty,
                    tax: payload.tax,
                    supplier: payload.supplier,
                    user_id: payload.user_id
                }
            )
            .then(res => {
                return dispatch(addItemToStockSuccess(res));
            })
            .catch(err => dispatch(addItemToStockFail(err)));
    };
};

export const addSupplier = (payload) => {
    console.log(payload)
    return dispatch => {
        dispatch(addSupplierReq());
        return axios
            .post(`http://127.0.0.1:5000/user/supplier/add`,
                {
                    name: payload.name,
                    address: payload.address,
                    contact: payload.contact,
                    user_id: payload.user_id
                }
            )
            .then(res => {
                return dispatch(addSupplierSuccess(res));
            })
            .catch(err => dispatch(addSupplierFail(err)));
    };
};

export const deleteSupplier = (payload) => {
    console.log('deletee payload', payload)
    return dispatch => {
        dispatch(deleteSupplierReq());
        return axios
            .get(`http://127.0.0.1:5000/user/supplier/delete/${payload}`)
            .then(res => {
                return dispatch(deleteSupplierSuccess(res));
            })
            .catch(err => dispatch(deleteSupplierFail(err)));
    }
}

export const deleteStock = (payload) => {
    console.log('delete stock payload', payload)
    return dispatch => {
        dispatch(deleteStockReq());
        return axios
            .get(`http://127.0.0.1:5000/user/stock/delete/${payload}`)
            .then(res => {
                return dispatch(deleteStockSuccess(res));
            })
            .catch(err => dispatch(deleteStockFail(err)));
    }
}

export const editStock = (payload) => {
    console.log(payload)
    return dispatch => {
        dispatch(editStockReq());
        return axios
            .post(`http://127.0.0.1:5000/user/stock/edit/${payload.stock_id}`,
                {
                    item_name: payload.item_name,
                    ppu: payload.ppu,
                    spu: payload.spu,
                    qty: payload.qty,
                    tax: payload.tax,
                    supplier: payload.supplier,
                    user_id: payload.user_id,
                    supplier_id: payload.supplier_id
                }
            )
            .then(res => {
                return dispatch(editStockSuccess(res));
            })
            .catch(err => dispatch(editStockFail(err)));
    };
};

export const editSupplier = (payload) => {
    console.log(payload)
    return dispatch => {
        dispatch(editSupplierReq());
        return axios
            .post(`http://127.0.0.1:5000/user/supplier/edit/${payload.supplier_id}`,
                {
                    name: payload.name,
                    address: payload.address,
                    contact: payload.contact,
                    user_id: payload.user_id
                }
            )
            .then(res => {
                return dispatch(editSupplierSuccess(res));
            })
            .catch(err => dispatch(editSupplierFail(err)));
    };
};