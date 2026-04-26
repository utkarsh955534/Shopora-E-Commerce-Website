"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f0f1a] text-white min-h-screen overflow-hidden">

      {/* 🔥 HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-bold leading-tight">
            Discover the Future of Shopping 🛍️
          </h2>

          <p className="mt-4 text-gray-400 text-lg">
            Premium products, lightning fast delivery, and unbeatable prices.
          </p>

          <div className="mt-8 flex gap-4">

            {/* SHOP NOW */}
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-lg"
            >
              Shop Now
            </button>

            {/* EXPLORE */}
            <button
              onClick={() => navigate("/dashboard")}
              className="border border-gray-600 px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Explore
            </button>

          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 md:mt-0 relative"
        >
          <div className="absolute -inset-2 bg-purple-600 blur-2xl opacity-30 rounded-xl"></div>

          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            className="rounded-xl w-[420px] relative z-10 shadow-2xl"
          />
        </motion.div>
      </section>

      {/* 🔥 CATEGORIES */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Top Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {["Electronics", "Fashion", "Shoes", "Gadgets"].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/dashboard")}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl text-center cursor-pointer hover:bg-purple-600 transition"
            >
              <h3 className="text-lg font-medium">{cat}</h3>
            </motion.div>
          ))}

        </div>
      </section>

      {/* 🔥 TRENDING */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Trending Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {[1, 2, 3, 4].map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={item}
              onClick={() => navigate("/dashboard")}
              className="bg-white/5 backdrop-blur-md rounded-xl p-4 cursor-pointer hover:shadow-xl transition"
            >
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                className="rounded-lg"
              />

              <h3 className="mt-2 font-medium">Smart Watch</h3>
              <p className="text-purple-400">₹1999</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* 🔥 CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <h2 className="text-4xl font-bold">Start Shopping Now 🚀</h2>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-black px-8 py-3 rounded-xl hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

      {/* 🔥 FOOTER */}
      <footer className="text-center py-6 bg-black text-gray-500">
        © 2026 Shopora. All rights reserved.
      </footer>

    </div>
  );
}