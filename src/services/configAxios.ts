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
    const status = error?.response?.status;
    const requestUrl = error?.config?.url as string | undefined;
    const isLoginRequest = requestUrl?.includes("/api/users/token/");

    if (status === 401 && !isLoginRequest) {
      Cookies.remove("access_token");
      if (typeof window !== "undefined" && window.location.pathname !== "/auth/sign-in") {
        window.location.href = "/auth/sign-in";
      }
    }
    return Promise.reject(error);
  }
);
