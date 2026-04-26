import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 FETCH CART
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data.items || []);
    } catch (err) {
      toast.error("Failed to load cart ❌");
    }
  };

  // ➕ INCREASE
  const increaseQty = async (productId) => {
    try {
      await API.post("/cart/increase", { productId });
      fetchCart();
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed ❌");
    }
  };

  // ➖ DECREASE
  const decreaseQty = async (productId) => {
    try {
      await API.post("/cart/decrease", { productId });
      fetchCart();
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed ❌");
    }
  };

  // ❌ REMOVE
  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      toast.success("Removed ❌");
      fetchCart();
    } catch {
      toast.error("Failed ❌");
    }
  };

  // 💰 TOTAL
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">My Cart 🛒</h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">Cart is empty 😢</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="md:col-span-2 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-lg"
                >

                  {/* IMAGE */}
                  <img
                    src={item.product.image}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">

                    <h3 className="font-semibold">
                      {item.product.name}
                    </h3>

                    <p className="text-gray-400 text-sm line-clamp-2">
                      {item.product.description || "Premium product"}
                    </p>

                    <p className="text-purple-400 mt-2">
                      ₹{item.product.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-3 mt-3">

                      <button
                        disabled={item.quantity === 1}
                        onClick={() => decreaseQty(item.product._id)}
                        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.product._id)}
                        className="px-3 py-1 bg-gray-700 rounded"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-col justify-between">

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-400 text-sm"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() =>
                        navigate("/checkout", {
                          state: {
                            product: item.product,
                            quantity: item.quantity,
                          },
                        })
                      }
                      className="bg-purple-600 px-4 py-1 rounded"
                    >
                      Buy Now
                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white/5 p-6 rounded-xl backdrop-blur-lg h-fit">

              <h2 className="text-xl mb-4">Price Details</h2>

              <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total Price</span>
                <span>₹{total}</span>
              </div>

              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: {
                      cartItems: cart,
                      total,
                    },
                  })
                }
                className="w-full bg-green-600 py-3 rounded-lg hover:bg-green-700"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}