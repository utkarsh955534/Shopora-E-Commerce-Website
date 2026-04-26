import { useLocation } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function ProductDetail() {
  const { state } = useLocation();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = state;

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white p-6">

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Image */}
        <img src={product.image} className="rounded-xl w-full" />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-purple-400 text-xl mt-2">₹{product.price}</p>

          <p className="mt-4 text-gray-400">
            Premium quality product with fast delivery.
          </p>

          {/* Delivery */}
          <div className="mt-4 bg-white/10 p-3 rounded-lg">
            Deliver to: Moradabad, UP 🚚
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">

            {/* 🛒 Add to Cart */}
            <button
              onClick={async () => {
                try {
                  await API.post("/cart", {
                    productId: product._id, // ✅ FIX
                    quantity: 1,
                  });

                  toast.success("Added to cart 🛒");
                } catch (err) {
                  console.log(err.response?.data);
                  toast.error("Failed ❌");
                }
              }}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:opacity-90"
            >
              Add to Cart
            </button>

            {/* Buy Now */}
            <button
              onClick={() => {
                navigate("/checkout", { state: product });
              }}
              className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Buy Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}