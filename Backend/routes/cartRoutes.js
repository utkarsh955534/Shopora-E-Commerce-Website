import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);

router.post("/increase", protect, increaseQty);   
router.post("/decrease", protect, decreaseQty);

router.delete("/:productId", protect, removeFromCart);

export default router;