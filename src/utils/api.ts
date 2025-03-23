import axios, { AxiosError, AxiosResponse } from "axios";
const url = import.meta.env.VITE_URL_API;

const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptar la peticion con el access_token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


//Interceptar la respuesta cuando es 401, para redirigir al login
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
