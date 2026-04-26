import express from "express";
import dotenv from "dotenv";
dotenv.config();


import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./utils/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";



//  connect DB
connectDB();

const app = express();

//  middleware
app.use(express.json());

//  CORS (important for frontend connection)
import cors from "cors";
app.use(cors());

//  ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

//  root route (health check)
app.get("/", (req, res) => {
  res.send("API running...");
});

// not found (should be AFTER routes)
app.use(notFound);

// error handler (last middleware)
app.use(errorHandler);

//  PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);