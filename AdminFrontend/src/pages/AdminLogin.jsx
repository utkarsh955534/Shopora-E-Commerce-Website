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

      console.log(res.data); // 🔥 debug

      if (res.data.role !== "admin") {
        toast.error("Not an admin ❌");
        return;
      }

      // 🔐 SAVE BOTH
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Login success ✅");

      navigate("/admin/dashboard");

    } catch (err) {
      console.log(err.response?.data); // 🔥 VERY IMPORTANT

      toast.error(
        err.response?.data?.message || "Login failed ❌"
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">

        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-800"
        />

        <button
          onClick={login}
          className="w-full bg-purple-600 py-2"
        >
          Login
        </button>

      </div>
    </div>
  );
}