import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  registerAdmin
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin-register", registerAdmin);
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 protected
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;