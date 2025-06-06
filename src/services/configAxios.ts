import axios from "axios";
import Cookies from "js-cookie";

export const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_HOST,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiConfig.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
