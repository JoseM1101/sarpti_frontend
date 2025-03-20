import axios from "axios";
import { API_BASE_URL } from "./api";
import Cookies from "js-cookie";
import { showLoader, hideLoader } from "../components/providers/loadingService";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

let activeRequests = 0;

axios.interceptors.request.use(
  (config) => {
    // Use a custom flag to skip the loader if necessary.
    const skipLoader = (config as any).skipLoader;
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    if (!skipLoader) {
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
      hideLoader();
    }
  }
};

axios.interceptors.response.use(
  (response) => {
    decrementActiveRequests(response.config);
    return response;
  },
  (error) => {
    // Check if error.config exists
    if (error.config) {
      decrementActiveRequests(error.config);
    }
    return Promise.reject(error);
  }
);
