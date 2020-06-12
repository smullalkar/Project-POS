import {
    REGISTER_USER_REQ,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_USER_REQ,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
} from "./Actiontypes";

export const initStore = {
    data: [],
    isLoading: false,
    response: '',
    error: '',
    loginData: []
};

export default (state = initStore, action) => {
    console.log('action called', action.payload);
    switch (action.type) {
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
