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

apiConfig.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("access_token");
      window.location.href = "/auth/sign-in";
    }
    return Promise.reject(error);
  }
);
