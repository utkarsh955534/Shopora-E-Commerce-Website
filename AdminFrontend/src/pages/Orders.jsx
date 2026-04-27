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
    <div className="px-4 sm:px-6 lg:px-8 py-4 text-white min-h-screen bg-[#0f0f1a]">

      <h1 className="text-xl sm:text-2xl md:text-3xl mb-6 font-bold">
        Orders Dashboard 📦
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet 😢</p>
      ) : (
        <div className="space-y-4 sm:space-y-5">

          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white/5 backdrop-blur-lg p-4 sm:p-5 rounded-xl border border-white/10 shadow-lg"
            >

              {/* TOP */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-xs sm:text-sm break-all">{o._id}</p>

                  <p className="font-semibold mt-1 text-sm sm:text-base">
                    ₹{o.totalPrice}
                  </p>
                </div>

                {/* PAYMENT STATUS */}
                <span
                  className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs sm:text-sm ${
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
              <div className="mt-3 text-xs sm:text-sm text-gray-300 break-words">
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
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                    />

                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium">
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
              <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

                {/* STATUS BADGE */}
                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm w-fit ${
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
                <div className="flex flex-wrap gap-2">

                  {o.orderStatus === "placed" && (
                    <button
                      onClick={() => updateStatus(o._id, "shipped")}
                      disabled={loadingId === o._id}
                      className="bg-blue-500 hover:bg-blue-600 px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm transition disabled:opacity-40"
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
                      className="bg-green-600 hover:bg-green-700 px-3 sm:px-4 py-1 rounded-lg text-xs sm:text-sm transition disabled:opacity-40"
                    >
                      {loadingId === o._id
                        ? "Processing..."
                        : "✅ Deliver"}
                    </button>
                  )}

                  {o.orderStatus === "delivered" && (
                    <span className="text-green-400 text-xs sm:text-sm">
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
