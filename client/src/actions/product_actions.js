import {
    GET_PRODUCT_BY_SOLD, GET_PRODUCT_BY_ARRIVAL, GET_WOODS, ADD_WOOD,
    GET_BRANDS, GET_PRODUCT_DETAIL, CLEAR_PRODUCT_DETAIL,
    ADD_BRAND, GET_PRODUCTS_TO_SHOP, ADD_PRODUCT, CLEAR_PRODUCT
} from './types';
import { PRODUCT_SERVER } from '../components/UI/misc';
import axios from 'axios';

export function getProductBySold() {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);
    return {
        type: GET_PRODUCT_BY_SOLD,
        payload: request
    }
}

export function getProductByArrival() {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);
    return {
        type: GET_PRODUCT_BY_ARRIVAL,
        payload: request
    }
}

//========================================
//              CATEGORY
//========================================

export function getWOODS() {
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
        .then(response => response.data);
    return {
        type: GET_WOODS,
        payload: request
    }
}

export function addWOOD(dataToSubmit, existingWoods) {
    const request = axios.post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
        .then(response => {
            let woods = [
                ...existingWoods,
                response.data.wood
            ]
            return {
                success: response.data.success,
                woods
            }
        })
    return {
        type: ADD_WOOD,
        payload: request
    }
}

export function getBRANDS() {
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data);
    return {
        type: GET_BRANDS,
        payload: request
    }
}

export function addBRAND(dataToSubmit, existingBrands) {
    const request = axios.post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
        .then(response => {
            let brands = [
                ...existingBrands,
                response.data.brand
            ]
            return {
                success: response.data.success,
                brands
            }
        })
    return {
        type: ADD_BRAND,
        payload: request
    }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
    const data = {
        skip,
        limit,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
        .then(response => {
            let newState = [
                ...previousState,
                ...response.data.articles
            ]
            return {
                size: response.data.size,
                articles: newState
            }
        })
    return {
        type: GET_PRODUCTS_TO_SHOP,
        payload: request
    }
}


// ===================================
//      Admin Add Product
// ===================================

export function addProduct(dataToSubmit) {
    const request = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
        .then(response => response.data)
    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct() {
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

export function getProductDetail(id) {
    const request = axios.get(`/api/product/articles_by_id?id=${id}&type=single`)
        .then(response => {
            return response.data[0]
        })
    return {
        type: GET_PRODUCT_DETAIL,
        payload: request
    }
}

export function clearProductDetail() {
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload: ''
    }
}



