import express from "express";
import {
  getDashboardStats,
  getAllOrders,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, getDashboardStats);
router.get("/orders", protect, isAdmin, getAllOrders);

export default router;