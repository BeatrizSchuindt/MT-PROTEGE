import axios from 'axios';

const accessToken = sessionStorage.getItem('token');

export const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        "Content-Type": 'application/json',
        'Authorization': `Bearer ${JSON.parse(accessToken)}`
    }
});