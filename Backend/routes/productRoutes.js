import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 🔓 PUBLIC
router.get("/", getProducts);

// 🔐 ADMIN (put BEFORE :id)
router.get("/admin-products", protect, isAdmin, getAdminProducts);
router.post("/", protect, isAdmin, createProduct);
router.put("/:id", protect, isAdmin, updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

// 🔓 SINGLE PRODUCT (ALWAYS LAST)
router.get("/:id", getProductById);

export default router;