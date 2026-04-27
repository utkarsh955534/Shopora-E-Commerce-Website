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

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const revenue = orders.reduce((acc, o) => acc + o.totalPrice, 0);

  return (
    <div className="text-white px-4 sm:px-6 lg:px-8 py-4">

      {/* 🔥 TITLE */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Admin Dashboard 📊
      </h1>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">

        <div className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-lg shadow-md">
          <h2 className="text-gray-400 text-sm sm:text-base">Total Orders</h2>
          <p className="text-xl sm:text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-lg shadow-md">
          <h2 className="text-gray-400 text-sm sm:text-base">Products</h2>
          <p className="text-xl sm:text-2xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-lg shadow-md">
          <h2 className="text-gray-400 text-sm sm:text-base">Revenue</h2>
          <p className="text-xl sm:text-2xl font-bold">₹{revenue}</p>
        </div>

      </div>

      {/* 🔥 RECENT ORDERS */}
      <div className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-lg shadow-md">

        <h2 className="text-lg sm:text-xl mb-4">Recent Orders 📦</h2>

        <div className="space-y-3">
          {orders.slice(0, 5).map((o) => (
            <div
              key={o._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3 gap-1 sm:gap-0 text-sm sm:text-base"
            >
              <span className="font-medium">#{o._id.slice(-6)}</span>

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

    </div>
  );
}
