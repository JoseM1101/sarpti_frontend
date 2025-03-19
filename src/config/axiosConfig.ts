import axios from "axios";
import { API_BASE_URL } from "./api";
import Cookies from "js-cookie";
import { showLoader, hideLoader } from "../components/providers/loadingService";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// Global variables to track active requests and loader state
let activeRequests = 0;
let loaderTimer: ReturnType<typeof setTimeout> | null = null;
let loaderVisible = false;

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    activeRequests++;
    if (activeRequests === 1) {
      loaderTimer = setTimeout(() => {
        showLoader();
        loaderVisible = true;
        loaderTimer = null;
      }, 500);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const decrementActiveRequests = () => {
  activeRequests = Math.max(activeRequests - 1, 0);
  // When there are no more pending requests clear the timer and hide loader if it was shown
  if (activeRequests === 0) {
    if (loaderTimer) {
      clearTimeout(loaderTimer);
      loaderTimer = null;
    }
    if (loaderVisible) {
      hideLoader();
      loaderVisible = false;
    }
  }
};

axios.interceptors.response.use(
  (response) => {
    decrementActiveRequests();
    return response;
  },
  (error) => {
    decrementActiveRequests();
    return Promise.reject(error);
  }
);
