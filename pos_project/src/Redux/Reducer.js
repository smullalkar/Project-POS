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
    EDITSUPPLIER_REQ,
    EDITSUPPLIER_SUCCESS,
    EDITSUPPLIER_FAIL,
    LOGOUT_USER,
    ADD_ITEM_TO_BILL,
    REMOVE_ITEM_BILL,
    REMOVE_ALLITEM_BILL,
    ADDCUSTOMER_REQ,
    ADDCUSTOMER_SUCCESS,
    ADDCUSTOMER_FAIL,
    ADDCUSTOMER_BILL_REQ,
    ADDCUSTOMER_BILL_SUCCESS,
    ADDCUSTOMER_BILL_FAIL,
    GETCUSTOMER_BILL_REQ,
    GETCUSTOMER_BILL_SUCCESS,
    GETCUSTOMER_BILL_FAIL,
    GETMONTHLY_SALES_REQ,
    GETMONTHLY_SALES_SUCCESS,
    GETMONTHLY_SALES_FAIL,
    GETALL_SALES_REQ,
    GETALL_SALES_SUCCESS,
    GETALL_SALES_FAIL,
    GETYEAR_SALES_REQ,
    GETYEAR_SALES_SUCCESS,
    GETYEAR_SALES_FAIL
} from "./Actiontypes";

export const initStore = {
    inventoryData: [],
    isLoading: false,
    response: '',
    error: '',
    loginData: [],
    isLoggedin: false,
    customerData: [],
    supplierData: [],
    bill_items: [],
    billing_customer: [],
    billadded: false,
    customerBill: [],
    monthlySales: [],
    allSales: [],
    yearSales: []
};

export default (state = initStore, action) => {
    console.log('action called', action.payload);
    switch (action.type) {
        case GETYEAR_SALES_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case GETYEAR_SALES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                yearSales: action.payload
            };
        case GETYEAR_SALES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case GETALL_SALES_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case GETALL_SALES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allSales: action.payload
            };
        case GETALL_SALES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case GETMONTHLY_SALES_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case GETMONTHLY_SALES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                monthlySales: action.payload
            };
        case GETMONTHLY_SALES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case GETCUSTOMER_BILL_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case GETCUSTOMER_BILL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customerBill: action.payload
            };
        case GETCUSTOMER_BILL_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case ADDCUSTOMER_BILL_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case ADDCUSTOMER_BILL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                billadded: action.payload
            };
        case ADDCUSTOMER_BILL_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case ADD_ITEM_TO_BILL:
            let item = []
            state.inventoryData.data.filter(elem => {
                if (elem[7] === Number(action.payload.stock_id)) {
                    return item.push([elem, action.payload.qty])
                }
            })
            return {
                ...state,
                bill_items: [...state.bill_items, ...item]
            }
        case REMOVE_ITEM_BILL:
            return {
                ...state,
                bill_items: [...state.bill_items].filter(item => {
                    return item[0][7] !== Number(action.payload)
                })
            }
        case REMOVE_ALLITEM_BILL:
            return {
                ...state,
                bill_items: []
            }
        case LOGOUT_USER:
            console.log('logout, ', action.payload)
            return {
                ...state,
                isLoggedin: false
            }
        case ADDSUPPLIER_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case ADDSUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                supplierData: action.payload
            };
        case ADDSUPPLIER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case EDITSUPPLIER_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case EDITSUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                supplierData: action.payload
            };
        case EDITSUPPLIER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case DELETESUPPLIER_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case DELETESUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                supplierData: action.payload
            };
        case DELETESUPPLIER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case DELETESTOCK_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case DELETESTOCK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                inventoryData: action.payload
            };
        case DELETESTOCK_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case ADDITEM_STOCK_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case ADDITEM_STOCK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                inventoryData: action.payload
            };
        case ADDITEM_STOCK_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
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
        case ADDCUSTOMER_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case ADDCUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                billing_customer: action.payload
            };
        case ADDCUSTOMER_FAIL:
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
