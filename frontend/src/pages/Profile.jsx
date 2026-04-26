import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../api";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 🔐 AUTH CHECK + LOAD DATA
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    } else {
      fetchProfile();
      fetchOrders();
    }
  }, []);

  // 👤 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);

      setForm({
        name: res.data.name || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
      });
    } catch {
      toast.error("Profile load failed ❌");
    }
  };

  // 📦 FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      setOrders(res.data);
    } catch {
      toast.error("Orders load failed ❌");
    }
  };

  // ✏️ UPDATE PROFILE
  const updateProfile = async () => {
    try {
      const res = await API.put("/auth/profile", form);
      setUser(res.data);
      setEditMode(false);
      toast.success("Profile updated ✅");
    } catch {
      toast.error("Update failed ❌");
    }
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out 👋");

    setTimeout(() => {
      window.location.href = "/login";
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 👤 PROFILE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 p-6 rounded-xl backdrop-blur-lg"
        >
          <h2 className="text-2xl mb-4">My Profile 👤</h2>

          {!editMode ? (
            <>
              <p><span className="text-gray-400">Name:</span> {user?.name}</p>
              <p><span className="text-gray-400">Email:</span> {user?.email}</p>
              <p><span className="text-gray-400">Phone:</span> {user?.phone || "N/A"}</p>
              <p><span className="text-gray-400">Address:</span> {user?.address || "N/A"}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-purple-600 px-4 py-2 rounded"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Name"
                className="w-full p-2 mb-3 bg-white/10 rounded"
              />

              <input
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                placeholder="Phone"
                className="w-full p-2 mb-3 bg-white/10 rounded"
              />

              <input
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                placeholder="Address"
                className="w-full p-2 mb-3 bg-white/10 rounded"
              />

              <div className="flex gap-3">
                <button
                  onClick={updateProfile}
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </motion.div>

        {/* 📦 ORDERS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 p-6 rounded-xl backdrop-blur-lg"
        >
          <h2 className="text-2xl mb-4">My Orders 📦</h2>

          {orders.length === 0 ? (
            <p className="text-gray-400">No orders yet 😢</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white/10 p-4 rounded-xl"
                >
                  <p className="text-sm text-gray-400">
                    Order ID: {order._id.slice(-6)}
                  </p>

                  <p className="mt-2 font-semibold">
                    ₹{order.totalPrice}
                  </p>

                  <p className="text-sm text-gray-400">
                    {order.paymentMethod}
                  </p>

                  <p
                    className={`mt-2 text-sm ${
                      order.orderStatus === "delivered"
                        ? "text-green-400"
                        : order.orderStatus === "shipped"
                        ? "text-blue-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {order.orderStatus.toUpperCase()}
                  </p>

                  {/* 🛒 ITEMS (SAFE RENDER) */}
                  <div className="mt-3 space-y-2">
                    {order.items.map((item, index) => {
                      if (!item.product) return null;

                      return (
                        <div key={item.product._id || index} className="flex gap-2">
                          <img
                            src={item.product?.image || "/placeholder.png"}
                            className="w-12 h-12 rounded object-cover"
                            alt=""
                          />

                          <div>
                            <p className="text-sm">
                              {item.product?.name || "Product removed"}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}