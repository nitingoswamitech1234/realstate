import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // 👈 login ke time pe token store karte hain

  if (!token) {
    // agar token nahi mila toh login page pe redirect
    return <Navigate to="/login" replace />;
  }

  return children; // agar token hai toh page access mil jaye
}
