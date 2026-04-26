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
    const res = await API.get("/products/admin-products"); // 🔥 only admin products
    setProducts(res.data);
  };

  // ➕ ADD PRODUCT
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

  // ❌ DELETE
  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    toast.success("Deleted ❌");
    fetchProducts();
  };

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">Manage Products 📦</h1>

      {/* 🔥 FORM */}
      <div className="bg-white/5 p-6 rounded-xl mb-6 backdrop-blur-lg">

        <h2 className="text-xl mb-4">Add New Product</h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 bg-white/10 rounded"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 bg-white/10 rounded"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="p-3 bg-white/10 rounded"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-3 bg-white/10 rounded"
          />

          <input
            placeholder="Brand / Company"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="p-3 bg-white/10 rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="p-3 bg-white/10 rounded col-span-2"
          />

        </div>

        <button
          onClick={addProduct}
          className="mt-4 bg-green-600 px-6 py-2 rounded-lg"
        >
          Add Product
        </button>

      </div>

      {/* 🔥 PRODUCT LIST */}
      <div className="grid md:grid-cols-3 gap-6">

        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white/5 p-4 rounded-xl backdrop-blur-lg"
          >
            <img
              src={p.image}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-2 font-semibold">{p.name}</h3>

            <p className="text-gray-400 text-sm">
              {p.description?.slice(0, 60)}
            </p>

            <p className="text-purple-400 mt-2">₹{p.price}</p>

            <p className="text-xs text-gray-500">
              {p.brand} | {p.category}
            </p>

            <button
              onClick={() => deleteProduct(p._id)}
              className="mt-3 text-red-400"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}