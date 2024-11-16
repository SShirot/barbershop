import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
	headers: {
		Accept: "application/json,*"
	}
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        // Chuẩn hóa phản hồi trả về
        return {
            data: response.data.data,
            status: response.data.status,
            statusText: response.statusText,
            message: response.data.message,
        };
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            console.info("===========[] ===========[window.location.href LOGIN] : ");
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const apiHelper = {
    get: (url, config = {}) => api.get(url, config),
    post: (url, data, config = {}) => api.post(url, data, config),
    put: (url, data, config = {}) => api.put(url, data, config),
    delete: (url, config = {}) => api.delete(url, config),
};

export default apiHelper;
