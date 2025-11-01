import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/adminApi";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(form.username, form.password);
      if (res.success) {
        localStorage.setItem("adminToken", res.token);
        localStorage.setItem("adminAuth", true);
        navigate("/admin/project");
      } else {
        alert(res.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials or server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 md:py-16 bg-[#252942] h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-[350px] border-t-4 border-[#d4af6a]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#252942]">
          Genesis Realty
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-3 rounded-md font-medium text-lg transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#d4af6a] hover:bg-[#c29b54] shadow-md hover:shadow-lg transform hover:scale-[1.02]"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
