import axios from 'axios';
// import { reactLocalStorage } from 'reactjs-localstorage';
const apiUrl = import.meta.env.VITE_API_URL;

let headers = {};

const BACKEND_URL = `${apiUrl}/api/`;


const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response);
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }

        if (error.response.status === 403 || error.response.status === 401) {
            localStorage.clear();
            window.location = "/login";
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    },
);

export default axiosInstance;