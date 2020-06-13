import {
    REGISTER_USER_REQ,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_USER_REQ,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
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

export const initStore = {
    inventoryData: [],
    isLoading: false,
    response: '',
    error: '',
    loginData: [],
    isLoggedin: false,
    customerData: [],
    supplierData: []
};

export default (state = initStore, action) => {
    console.log('action called', action.payload);
    switch (action.type) {
        case GET_SUPPLIER_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case GET_SUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                supplierData: action.payload
            };
        case GET_SUPPLIER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case GET_INVENTORY_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case GET_INVENTORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                inventoryData: action.payload
            };
        case GET_INVENTORY_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case GET_CUSTOMER_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customerData: action.payload
            };
        case GET_CUSTOMER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case LOGIN_USER_REQ:
            return {
                ...state,
                isLoading: true,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loginData: action.payload,
                isLoggedin: true
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: true,
            }
        case REGISTER_USER_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                response: action.payload
            };
        case REGISTER_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
