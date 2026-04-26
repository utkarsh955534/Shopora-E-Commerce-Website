import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "shopora", // 🔥 optional (custom DB name)
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB Connection Error:", error.message);

    // 🔥 app crash if DB fails (best practice)
    process.exit(1);
  }
};

export default connectDB;