import axios from "axios";
import { API_BASE_URL } from "./api";
import Cookies from "js-cookie";
import { showLoader, hideLoader } from "../components/providers/loadingService";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

let activeRequests = 0;
let hideLoaderTimer: ReturnType<typeof setTimeout> | null = null;

axios.interceptors.request.use(
  (config) => {
    const skipLoader = (config as any).skipLoader;
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    if (!skipLoader) {
      // Si se activa un nuevo request, se cancela el timer del loader
      if (hideLoaderTimer) {
        clearTimeout(hideLoaderTimer);
        hideLoaderTimer = null;
      }
      activeRequests++;
      if (activeRequests === 1) {
        showLoader();
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const decrementActiveRequests = (config: any) => {
  const skipLoader = config && config.skipLoader;
  if (!skipLoader) {
    activeRequests = Math.max(activeRequests - 1, 0);
    if (activeRequests === 0) {
      // Mantener el loader visible al menos 500 ms
      hideLoaderTimer = setTimeout(() => {
        hideLoader();
        hideLoaderTimer = null;
      }, 500);
    }
  }
};

axios.interceptors.response.use(
  (response) => {
    decrementActiveRequests(response.config);
    return response;
  },
  (error) => {
    if (error.config) {
      decrementActiveRequests(error.config);
    }
    return Promise.reject(error);
  }
);

export default axios;
