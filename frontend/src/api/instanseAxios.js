import axios from 'axios';

export const instance = axios.create({
    baseURL : 'http://localhost:2001/',
    headers : {
        'Authorization' : `${new Date().toISOString()} ${localStorage.getItem('token')}`
    }
});