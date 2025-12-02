import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apbackend-production-b830.up.railway.app/api',
    withCredentials: true,
});

export default api;
