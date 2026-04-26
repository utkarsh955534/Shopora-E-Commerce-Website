import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 already logged in → redirect to profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, []);

  const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    navigate("/dashboard");

  } catch (err) {
    alert("Invalid credentials");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-black flex items-center justify-center text-white">

      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-96 shadow-xl border border-white/10">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome back 👋
        </h2>

        {/* Email */}
        <input
          className="w-full p-3 mb-4 bg-white/10 rounded-lg outline-none placeholder-gray-400"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full p-3 mb-6 bg-white/10 rounded-lg outline-none placeholder-gray-400"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-purple-500 py-3 rounded-lg font-medium hover:bg-purple-600 transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Register */}
        <p className="text-sm text-gray-400 text-center mb-3">
          Don't have an account?
        </p>

        <Link to="/register">
          <button className="w-full bg-white text-black py-3 rounded-lg font-medium hover:opacity-90 transition">
            Create Account
          </button>
        </Link>

      </div>
    </div>
  );
}