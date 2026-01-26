import axios from "axios";
import { axiosConfig } from "./axios.base";
import { useAuthStore } from "@/stores/useAuthStore";

export const authedAxios = axios.create(axiosConfig);

// Shared refresh to dedupe simultaneous 401s
let refreshPromise: Promise<void> | null = null;

authedAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // if no refresh in progress, start one
        if (!refreshPromise) {
          // create a new axios instance without a interceptor
          const refreshAxios = axios.create(axiosConfig);
          refreshPromise = refreshAxios.post("/auth/refresh-token");
        }

        await refreshPromise;
        refreshPromise = null;

        return authedAxios(originalRequest);
      } catch (err) {
        refreshPromise = null;
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
