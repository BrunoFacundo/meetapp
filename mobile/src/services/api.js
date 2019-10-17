import axios from 'axios';

const api = axios.create({
    baseURL: __DEV__ ? 'http://10.0.2.2:3333' : 'https://api.meetapp-bootcamp.tk'
});

export default api;
