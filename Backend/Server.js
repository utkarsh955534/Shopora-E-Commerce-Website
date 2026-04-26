import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// config
import connectDB from "./config/db.js";

// middlewares
import { notFound, errorHandler } from "./utils/errorHandler.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

// connect DB
connectDB();

const app = express();


// 🔥 Security middlewares
app.use(helmet());
app.use(morgan("dev"));


// 🔥 Body parser
app.use(express.json());


// 🔥 CORS setup (2 frontends support)
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);


// 🔥 Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);


// 🔥 Health check
app.get("/", (req, res) => {
  res.send("🚀 API running...");
});


// ❌ Not Found
app.use(notFound);

// ❌ Error Handler
app.use(errorHandler);


// 🔥 PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
