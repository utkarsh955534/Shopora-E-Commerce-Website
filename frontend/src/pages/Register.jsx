import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));

      toast.success("Registered successfully 🎉");

      navigate("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-2xl w-96 shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Create account</h2>

        <input
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 bg-gray-800 rounded-lg"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          className="w-full p-3 mb-6 bg-gray-800 rounded-lg"
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 py-3 rounded-lg hover:bg-purple-700"
        >
          Register
        </button>
      </div>
    </div>
  );
}