import axios from 'axios'
import Cookies from "js-cookie";
import { baseURL } from '@/constants/constants';

const axiosInstance = axios.create({
    baseURL, 
    timeout: 1000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      Cookies.remove("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;