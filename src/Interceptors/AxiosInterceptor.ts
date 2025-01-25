import axios from "axios";

const urlDev = import.meta.env.VITE_URL_API_Dev;
const urlProduction = import.meta.env.VITE_URL_API_Prod;

const instance = axios.create({
  baseURL: urlDev,
});

export default instance;