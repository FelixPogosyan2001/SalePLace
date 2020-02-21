import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
    baseURL : 'http://localhost:2001/' as string,
    headers : {
        'Authorization' : `${new Date().toISOString()} ${localStorage.getItem('token')}` as string 
    }
});