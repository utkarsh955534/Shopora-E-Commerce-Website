import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// 📊 DASHBOARD DATA
export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const products = await Product.countDocuments();

  const revenueData = await Order.find();
  const revenue = revenueData.reduce((acc, item) => acc + item.totalPrice, 0);

  res.json({
    users,
    orders,
    products,
    revenue,
  });
};

// 📦 ALL ORDERS
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
};