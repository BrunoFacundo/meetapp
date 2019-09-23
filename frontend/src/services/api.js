import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'http://35.211.143.59'
});

export default api;
