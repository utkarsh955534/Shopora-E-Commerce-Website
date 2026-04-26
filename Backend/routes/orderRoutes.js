import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getSellerOrders
} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 🧑 USER ROUTES
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

// 🔥 MOVE THIS ABOVE
router.get("/seller-orders", protect, isAdmin, getSellerOrders);

// ⚠️ ALWAYS LAST
router.get("/:id", protect, getOrderById);

// 🛠 ADMIN
router.put("/:id", protect, isAdmin, updateOrderStatus);

export default router;