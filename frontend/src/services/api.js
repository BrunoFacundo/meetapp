import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333' : 'https://api.meetapp-bootcamp.tk'
});

export default api;
