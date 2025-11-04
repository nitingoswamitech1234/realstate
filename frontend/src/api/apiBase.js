// src/api/apiBase.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://realstate-rurx.onrender.com/api", // base URL for all APIs
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
