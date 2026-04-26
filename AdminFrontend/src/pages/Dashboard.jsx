import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [orderRes, productRes] = await Promise.all([
        API.get("/admin/orders"),
        API.get("/products"),
      ]);

      setOrders(orderRes.data);
      setProducts(productRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 📊 stats
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const revenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  return (
    <div className="text-white">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard 📊</h1>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg">
          <h2 className="text-gray-400">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg">
          <h2 className="text-gray-400">Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg">
          <h2 className="text-gray-400">Revenue</h2>
          <p className="text-2xl font-bold">₹{revenue}</p>
        </div>

      </div>

      {/* 🔥 RECENT ORDERS */}
      <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg">

        <h2 className="text-xl mb-4">Recent Orders 📦</h2>

        {orders.slice(0, 5).map((o) => (
          <div
            key={o._id}
            className="flex justify-between border-b border-white/10 py-3"
          >
            <span>#{o._id.slice(-6)}</span>

            <span>₹{o.totalPrice}</span>

            <span
              className={
                o.orderStatus === "delivered"
                  ? "text-green-400"
                  : o.orderStatus === "shipped"
                  ? "text-blue-400"
                  : "text-yellow-400"
              }
            >
              {o.orderStatus}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}