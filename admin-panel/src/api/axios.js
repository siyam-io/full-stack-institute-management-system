import axios from "axios";
import { apiURL } from "../../Constant.js";
import { installErrorInterceptor } from "./error.js";

const URL = apiURL.api_url;

export const API = axios.create({
  baseURL: URL,
  withCredentials: true,
});

// Install global error interceptor (handles 401 logout automatically)
installErrorInterceptor(API);
