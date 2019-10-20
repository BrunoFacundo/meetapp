import axios from 'axios';
import { getTimeZone } from 'react-native-localize';

const api = axios.create({
    baseURL: __DEV__ ? 'http://10.0.2.2:3333' : 'https://api.meetapp-bootcamp.tk',
    headers: {
        timezone: getTimeZone()
    }
});

export default api;
