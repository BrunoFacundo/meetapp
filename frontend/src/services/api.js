import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'http://34.67.211.35'
});

export default api;
