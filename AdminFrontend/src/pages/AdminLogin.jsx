import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      if (res.data.role !== "admin") {
        toast.error("Not an admin ❌");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login success ✅");
      navigate("/admin/dashboard");

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed ❌"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a] text-white px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/5 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">

        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-5 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2.5 sm:p-3 mb-3 bg-white/10 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2.5 sm:p-3 mb-4 bg-white/10 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={login}
          className="w-full bg-purple-600 hover:bg-purple-700 transition py-2.5 sm:py-3 rounded-md font-medium"
        >
          Login
        </button>

        <div className="mt-4 text-center text-sm text-gray-400">
          <p>
            I don’t have an account?
            <button
              onClick={() => navigate("/admin/register")}
              className="ml-2 text-purple-400 underline"
            >
              Create Account
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
