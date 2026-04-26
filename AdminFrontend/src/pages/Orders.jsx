import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/seller-orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoadingId(id);

      await API.put(`/orders/${id}`, { status });

      await fetchOrders();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-[#0f0f1a]">

      <h1 className="text-3xl mb-6 font-bold">
        Orders Dashboard 📦
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet 😢</p>
      ) : (
        <div className="space-y-5">

          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white/5 backdrop-blur-lg p-5 rounded-xl border border-white/10 shadow-lg"
            >

              {/* TOP */}
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-xs text-gray-400">
                    Order ID
                  </p>
                  <p className="text-sm">{o._id}</p>

                  <p className="font-semibold mt-1">
                    ₹{o.totalPrice}
                  </p>
                </div>

                {/* PAYMENT STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    o.paymentStatus === "paid"
                      ? "bg-green-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {o.paymentStatus === "paid"
                    ? "Paid ✅"
                    : "COD 💵"}
                </span>

              </div>

              {/* CUSTOMER */}
              <div className="mt-3 text-sm text-gray-300">
                👤 {o.user?.name} ({o.user?.email})
              </div>

              {/* PRODUCTS */}
              <div className="mt-4 space-y-2">
                {o.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 bg-white/10 p-2 rounded-lg"
                  >

                    <img
                      src={item.product?.image}
                      className="w-12 h-12 rounded object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {item.product?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              {/* STATUS + ACTION */}
              <div className="mt-5 flex justify-between items-center">

                {/* STATUS BADGE */}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    o.orderStatus === "placed"
                      ? "bg-yellow-500"
                      : o.orderStatus === "shipped"
                      ? "bg-blue-500"
                      : "bg-green-600"
                  }`}
                >
                  {o.orderStatus.toUpperCase()}
                </span>

                {/* BUTTONS */}
                <div className="flex gap-2">

                  {o.orderStatus === "placed" && (
                    <button
                      onClick={() => updateStatus(o._id, "shipped")}
                      disabled={loadingId === o._id}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg transition disabled:opacity-40"
                    >
                      {loadingId === o._id
                        ? "Processing..."
                        : "🚚 Ship"}
                    </button>
                  )}

                  {o.orderStatus === "shipped" && (
                    <button
                      onClick={() => updateStatus(o._id, "delivered")}
                      disabled={loadingId === o._id}
                      className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg transition disabled:opacity-40"
                    >
                      {loadingId === o._id
                        ? "Processing..."
                        : "✅ Deliver"}
                    </button>
                  )}

                  {o.orderStatus === "delivered" && (
                    <span className="text-green-400 text-sm">
                      Delivered ✔
                    </span>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}