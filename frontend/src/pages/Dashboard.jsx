import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { useWishlist } from "../store/wishlistStore";
import { toast } from "react-toastify";
import API from "../api";

export default function Dashboard() {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, setWishlist, wishlist } = useWishlist();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();

    if (token) {
      fetchWishlist();
    }
  }, []);

  // 📦 PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products ❌");
    } finally {
      setLoading(false);
    }
  };

  // ❤️ WISHLIST
  const fetchWishlist = async () => {
    try {
      const res = await API.get("/users/wishlist");
      const formatted = res.data.map((item) => item.product);
      setWishlist(formatted);
    } catch (err) {
      console.log("wishlist error");
    }
  };

  // 🔍 FILTER
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true)
  );

  return (
    <div className="bg-[#0f0f1a] min-h-screen text-white flex">

      {/* Sidebar */}
      <div className="w-64 p-6 hidden md:block bg-white/5 backdrop-blur-lg">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {["All", "Electronics", "Fashion", "Shoes"].map((cat) => (
          <div
            key={cat}
            onClick={() => setCategory(cat === "All" ? "" : cat)}
            className={`cursor-pointer mb-2 ${category === cat ? "text-purple-400" : ""
              } hover:text-purple-400`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {!token && (
          <p className="text-yellow-400 mb-4">
            Login to use wishlist ❤️
          </p>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 mb-6 p-3 rounded-lg bg-white/10 outline-none"
        />

        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl mb-6 text-center font-semibold shadow-lg">
          Big Sale is Live 🔥
        </div>

        <h1 className="text-3xl font-bold mb-6">Explore Products</h1>

        {/* Loading */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {filteredProducts.map((p) => {
              const isWishlisted = wishlist.some(
                (w) => w._id === p._id
              );

              return (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`, { state: p })}
                  className="bg-white/5 rounded-xl p-4 cursor-pointer"
                >
                  <img src={p.image} className="h-40 w-full object-cover rounded" />

                  <h3 className="mt-2">{p.name}</h3>
                  <p className="text-purple-400">₹{p.price}</p>

                  <div className="flex justify-between mt-3">

                    {/* CART */}
                    <button
                      onClick={async () => {
                        try {
                          await API.post("/cart", {
                            productId: p._id,
                            quantity: 1,
                          });

                          toast.success("Added to cart 🛒");
                        } catch (err) {
                          toast.error("Failed ❌");
                        }
                      }}
                      className="bg-purple-500 px-3 py-1 rounded"
                    >
                      Add
                    </button>

                    {/* WISHLIST */}
                    <Heart
                      onClick={async (e) => {
                        e.stopPropagation();

                        if (!token) {
                          toast.error("Login required 🔐");
                          return;
                        }

                        toggleWishlist(p);

                        try {
                          await API.post(`/users/wishlist/${p._id}`);
                        } catch {
                          toast.error("Wishlist error ❌");
                        }
                      }}
                      className={`cursor-pointer ${isWishlisted ? "text-red-500" : ""
                        }`}
                    />
                  </div>
                </motion.div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}