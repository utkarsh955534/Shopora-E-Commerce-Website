import { useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
    brand: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products/admin-products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    try {
      if (!form.name || !form.price || !form.image) {
        toast.error("Fill required fields ❌");
        return;
      }

      await API.post("/products", form);

      toast.success("Product added ✅");

      setForm({
        name: "",
        price: "",
        image: "",
        category: "",
        description: "",
        brand: "",
      });

      fetchProducts();
    } catch {
      toast.error("Failed ❌");
    }
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    toast.success("Deleted ❌");
    fetchProducts();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 text-white">

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
        Manage Products 📦
      </h1>

      {/* 🔥 FORM */}
      <div className="bg-white/5 p-4 sm:p-6 rounded-xl mb-6 backdrop-blur-lg shadow-md">

        <h2 className="text-lg sm:text-xl mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2.5 sm:p-3 bg-white/10 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-2.5 sm:p-3 bg-white/10 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="p-2.5 sm:p-3 bg-white/10 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2.5 sm:p-3 bg-white/10 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            placeholder="Brand / Company"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="p-2.5 sm:p-3 bg-white/10 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="p-2.5 sm:p-3 bg-white/10 rounded-md col-span-1 sm:col-span-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

        <button
          onClick={addProduct}
          className="mt-4 w-full sm:w-auto bg-green-600 hover:bg-green-700 transition px-6 py-2.5 rounded-lg text-sm sm:text-base font-medium"
        >
          Add Product
        </button>

      </div>

      {/* 🔥 PRODUCT LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white/5 p-4 rounded-xl backdrop-blur-lg shadow-md"
          >
            <img
              src={p.image}
              className="h-36 sm:h-40 w-full object-cover rounded-md"
            />

            <h3 className="mt-2 font-semibold text-sm sm:text-base">
              {p.name}
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm">
              {p.description?.slice(0, 60)}
            </p>

            <p className="text-purple-400 mt-2 text-sm sm:text-base">
              ₹{p.price}
            </p>

            <p className="text-xs text-gray-500">
              {p.brand} | {p.category}
            </p>

            <button
              onClick={() => deleteProduct(p._id)}
              className="mt-3 text-red-400 text-xs sm:text-sm hover:text-red-500"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}
