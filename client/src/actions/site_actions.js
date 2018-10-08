import { GET_SITE_INFO, UPDATE_SITE_INFO } from './types';
import { SITE_SERVER } from '../components/UI/misc';
import axios from 'axios';

export function getSiteInfo() {
    const request = axios.get(`${SITE_SERVER}/site_data`)
        .then(response => response.data);
    return {
        type: GET_SITE_INFO,
        payload: request
    }
}

export function updateSiteInfo(dataToSubmit) {
    const request = axios.post(`${SITE_SERVER}/site_data`, dataToSubmit)
        .then(response => response.data);
    return {
        type: UPDATE_SITE_INFO,
        payload: request
    }
}
