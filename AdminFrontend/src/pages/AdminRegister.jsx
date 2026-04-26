import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    adminSecret: "",
  });

  const handleRegister = async () => {
    try {
      await API.post("/auth/admin-register", form);

      toast.success("Admin created successfully ✅");

      navigate("/admin/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f1a] text-white">

      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl w-96 border border-white/10">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Admin Register 🔐
        </h2>

        <input
          placeholder="Name"
          className="w-full p-3 mb-4 bg-white/10 rounded-lg outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full p-3 mb-4 bg-white/10 rounded-lg outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-white/10 rounded-lg outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Admin Secret Key"
          className="w-full p-3 mb-6 bg-white/10 rounded-lg outline-none"
          onChange={(e) =>
            setForm({ ...form, adminSecret: e.target.value })
          }
        />

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Register Admin
        </button>

      </div>
    </div>
  );
}