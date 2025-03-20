import axios from "axios"
import { API_BASE_URL } from "./api"
import Cookies from "js-cookie"
import { showLoader, hideLoader } from "../components/providers/loadingService"

axios.defaults.baseURL = API_BASE_URL
axios.defaults.withCredentials = true

let activeRequests = 0
let hideLoaderTimer: ReturnType<typeof setTimeout> | null = null

axios.interceptors.request.use(
  (config) => {
    const skipLoader = (config as any).skipLoader
    const token = Cookies.get("token")

    if (token) {
      config.headers.Authorization = token
    }

    if (!skipLoader) {
      // If there’s an ongoing hide timer, cancel it
      if (hideLoaderTimer) {
        clearTimeout(hideLoaderTimer)
        hideLoaderTimer = null
      }

      activeRequests++

      // **Set a delay before showing the loader (500ms)**
      if (activeRequests === 1) {
        hideLoaderTimer = setTimeout(() => {
          showLoader()
        }, 500)
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

const decrementActiveRequests = (config: any) => {
  const skipLoader = config && config.skipLoader

  if (!skipLoader) {
    activeRequests = Math.max(activeRequests - 1, 0)

    if (activeRequests === 0) {
      // **If request finishes before 500ms, prevent loader from appearing**
      if (hideLoaderTimer) {
        clearTimeout(hideLoaderTimer)
        hideLoaderTimer = null
      }

      // **Keep the loader visible for at least 500ms if it's already shown**
      hideLoaderTimer = setTimeout(() => {
        hideLoader()
        hideLoaderTimer = null
      }, 500)
    }
  }
}

// Attach response interceptor to hide the loader
axios.interceptors.response.use(
  (response) => {
    decrementActiveRequests(response.config)
    return response
  },
  (error) => {
    decrementActiveRequests(error.config)
    return Promise.reject(error)
  }
)

export default axios
