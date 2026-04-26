import Order from "../models/Order.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";


// 🛒 CREATE ORDER
export const createOrder = asyncHandler(async (req, res) => {
  const { items, totalPrice, paymentMethod, address } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  if (!address) {
    res.status(400);
    throw new Error("Address required");
  }

  const product = await Product.findById(items[0].product);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const order = await Order.create({
    user: req.user._id,
    seller: product.owner,
    items,
    totalPrice,
    paymentMethod,
    address,
    orderStatus: "placed",
    paymentStatus: paymentMethod === "UPI" ? "paid" : "pending",
  });

  res.status(201).json(order);
});


// 📦 GET USER ORDERS (FINAL FIXED)
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate({
      path: "items.product",
      select: "name image price",
      options: { strictPopulate: false },
    })
    .sort({ createdAt: -1 });

  // 🔥 remove broken products
  const safeOrders = orders.map(order => ({
    ...order._doc,
    items: order.items.filter(item => item.product),
  }));

  res.json(safeOrders);
});


// 📦 GET SELLER ORDERS
export const getSellerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ seller: req.user._id })
    .populate({
      path: "items.product",
      select: "name image price",
      options: { strictPopulate: false },
    })
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});


// 📦 GET SINGLE ORDER
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("items.product")
    .populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json(order);
});


// 🔄 UPDATE ORDER STATUS
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (req.body.status) {
    order.orderStatus = req.body.status;
  }

  if (req.body.paymentStatus) {
    order.paymentStatus = req.body.paymentStatus;
  }

  const updated = await order.save();

  res.json(updated);
});