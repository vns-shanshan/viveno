import { create } from "zustand";
import type { AxiosError } from "axios";

import axiosInstance from "@/lib/axios";

type User = {
  id: string;
  email: string;
  name: string;
  userType: "USER" | "ADMIN";
};

type SignupInput = {
  name: string;
  email: string;
  password: string;
};

type LoginInput = {
  email: string;
  password: string;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  checkingAuth: boolean;

  signup: (data: SignupInput) => Promise<User>;
  login: (data: LoginInput) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<User | null>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password }) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });

      set({ user: res.data, loading: false });

      return res.data;
    } catch (error: unknown) {
      set({ loading: false });

      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response?.status === 409) {
        throw new Error("Email already exists");
      }

      throw new Error("An error occurred during signup");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      set({ user: res.data, loading: false });

      return res.data;
    } catch (error: unknown) {
      set({ loading: false });

      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response?.status === 401) {
        throw new Error("Invalid email or password");
      }

      throw new Error("An error occurred during login");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    try {
      // console.log("Hello");
      const res = await axiosInstance.get("/auth/me");

      set({ user: res.data, checkingAuth: false });

      return res.data;
    } catch {
      set({ user: null, checkingAuth: false });
      return null;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      set({ user: null });
    }
  },
}));
