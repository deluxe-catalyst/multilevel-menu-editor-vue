import axios from "axios";

const hostLinkApi = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api`;

const axiosInstance = axios.create({
    baseURL: hostLinkApi,
    timeout: 1000
})

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('USER_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export default axiosInstance;