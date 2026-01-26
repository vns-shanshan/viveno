export const axiosConfig = {
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:5000" : "/",
  withCredentials: true,
};
