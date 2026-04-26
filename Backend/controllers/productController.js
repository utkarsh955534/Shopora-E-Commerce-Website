import Product from "../models/Product.js";


// 📦 GET ALL PRODUCTS (user side)
export const getProducts = async (req, res) => {
  const { keyword, category } = req.query;

  let query = {};

  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query);
  res.json(products);
};


// 📦 GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};


// ➕ CREATE PRODUCT (ADMIN ONLY)
export const createProduct = async (req, res) => {
  const { name, price, image, category, description, brand } = req.body;

  const product = await Product.create({
    name,
    price,
    image,
    category,
    description,
    brand,
    owner: req.user.id, // 🔥 IMPORTANT
  });

  res.status(201).json(product);
};


// 📦 GET ADMIN PRODUCTS (OWN ONLY)
export const getAdminProducts = async (req, res) => {
  const products = await Product.find({
    owner: req.user.id,
  });

  res.json(products);
};


// ✏️ UPDATE PRODUCT (ONLY OWNER)
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  // 🔥 OWNER CHECK
  if (product.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized ❌" });
  }

  Object.assign(product, req.body);

  const updated = await product.save();

  res.json(updated);
};


// ❌ DELETE PRODUCT (ONLY OWNER)
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  // 🔥 OWNER CHECK
  if (product.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized ❌" });
  }

  await product.deleteOne();

  res.json({ message: "Product deleted" });
};