import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json,*",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    //console.log('Raw Backend Response:', response); // Debugging log

    // Return the original Axios object for flat responses
    if (!response.data.data && !response.data.status && !response.data.message) {
      return response;
    }

    // Normalize nested responses
    return {
      data: response.data.data || response.data, // Fallback to full data object
      status: response.data.status || response.status, // Fallback to HTTP status code
      statusText: response.statusText,
      message: response.data.message || null, // Fallback to null if no message exists
    };
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
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
