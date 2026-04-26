import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },

      price: {
         type: Number,
         required: true,
      },

      brand: {
         type: String,
         default: "",
      },

      description: {
         type: String,
         default: "Premium product",
      },

      image: {
         type: String,
         required: true,
      },

      category: {
         type: String,
         required: true,
      },

      stock: {
         type: Number,
         default: 10,
      },

      rating: {
         type: Number,
         default: 0,
      },

      numReviews: {
         type: Number,
         default: 0,
      },

      // 🔥 ADD THIS (MOST IMPORTANT)
      owner: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true }
);

export default mongoose.model("Product", productSchema);