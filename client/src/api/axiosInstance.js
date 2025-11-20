import axios from "axios";

// Normalize VITE_API_URL so we don't get double '/api'
let base = import.meta.env.VITE_API_URL || "http://localhost:5000";
base = base.replace(/\/$/, ""); // remove trailing slash
if (base.toLowerCase().endsWith("/api")) {
  base = base.slice(0, -4); // remove trailing '/api'
}

const axiosInstance = axios.create({
  baseURL: base, // fixed
  timeout: 10000,
});

// Attach JWT token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
