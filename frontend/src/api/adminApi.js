// src/api/adminApi.js
import api from "./apiBase";

// 🔐 Login API
export const adminLogin = async (username, password) => {
  const response = await api.post("/admin/login", { username, password });
  return response.data;
};
