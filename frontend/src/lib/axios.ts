import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const axiosConfig = {
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:5000" : "/",
  withCredentials: true, // send cookies to the server
};

const axiosInstance = axios.create(axiosConfig);

let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // only handle 401 error once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // if no refresh in progress, start one
        if (!refreshPromise) {
          // create a new axios instance without a interceptor
          const retryAxiosInstance = axios.create(axiosConfig);
          refreshPromise = retryAxiosInstance.post("/auth/refresh-token");
          await refreshPromise;
          refreshPromise = null;
        } else {
          // wait for the ongoing refresh
          await refreshPromise;
        }

        // retry the original request with new access token cookie
        return axiosInstance(originalRequest);
      } catch (error) {
        // refresh failed, session invalid
        useAuthStore.getState().logout();
        refreshPromise = null;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
