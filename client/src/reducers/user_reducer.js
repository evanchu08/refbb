import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, ON_SUCCESS_BUY_USER,
    ADD_TO_CART_USER, GET_CART_ITEMS_USER, REMOVE_CART_ITEM_USER,
    CLEAR_USER_INFO, UPDATE_USER_INFO, RESET_USER
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case REGISTER_USER:
            return { ...state, registerSuccess: action.payload }
        case LOGOUT_USER:
            return { ...state, logoutSuccess: action.payload }
        case ADD_TO_CART_USER:
            return {
                ...state, userData: {
                    ...state.userData,
                    // only cart update
                    cart: action.payload
                }
            }
        case GET_CART_ITEMS_USER:
            return { ...state, cartDetail: action.payload }
        case REMOVE_CART_ITEM_USER:
            return {
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case ON_SUCCESS_BUY_USER:
            return {
                ...state,
                successBuy: action.payload.success,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart
                },
                cartDetail: action.payload.cartDetail
            }
        case UPDATE_USER_INFO:
            return { ...state, updateUser: action.payload }
        case CLEAR_USER_INFO:
            return { ...state, updateUser: action.payload }
        case RESET_USER:
            return { ...state, resetUser: action.payload }
        default:
            return state
    }
}



