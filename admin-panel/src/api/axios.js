import axios from "axios";
import { apiURL } from "../../Constant.js";
import { installErrorInterceptor } from "./error.js";

const URL = apiURL.api_url;

export const API = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// Attach Authorization header if token exists in localStorage (cross-site resilience)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Install global error interceptor (handles 401 logout automatically)
installErrorInterceptor(API);
