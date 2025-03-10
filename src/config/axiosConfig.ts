import { API_BASE_URL } from "./api";
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);