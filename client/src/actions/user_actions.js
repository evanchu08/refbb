
import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, ON_SUCCESS_BUY_USER,
    ADD_TO_CART_USER, GET_CART_ITEMS_USER, REMOVE_CART_ITEM_USER,
    UPDATE_USER_INFO, CLEAR_USER_INFO, RESET_USER
} from './types';
import { USER_SERVER, PRODUCT_SERVER } from '../components/UI/misc';
import axios from 'axios';

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
        .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`/api/users/logout`)
        .then(response => response.data);
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(_id) {
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
        .then(response => response.data)

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

export function getCartItems(cartItems, userCart) {
    const request = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
        .then(response => {
            userCart.forEach(item => {
                response.data.forEach((cart, i) => {
                    if (item.id === cart._id) {
                        response.data[i].quantity = item.quantity
                    }
                })
            })
            return response.data
        })
    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

export function removeCartItem(id) {
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
        .then(response => {
            response.data.cart.forEach(item => {
                response.data.cartDetail.forEach((cartDet, i) => {
                    if (item.id === cartDet._id) {
                        response.data.cartDetail[i].quantity = item.quantity;
                    }
                })
            })
            return response.data;
        })
    return {
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}

export function onSuccessBuy(data) {
    const request = axios.post(`${USER_SERVER}/successBuy`, data)
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request
    }
}

export function updateUserInfo(data) {
    const request = axios.post(`${USER_SERVER}/update_profile`, data)
        .then(response => response.data);

    return {
        type: UPDATE_USER_INFO,
        payload: request
    }
}

export function clearUserInfo() {
    return {
        type: CLEAR_USER_INFO,
        payload: ''
    }
}

export function resetUser(data) {
    const request = axios.post(`${USER_SERVER}/reset_user`, data)
        .then(response => response.data);
    return {
        type: RESET_USER,
        payload: request
    }
}

