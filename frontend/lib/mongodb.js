import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/music_generation_db";

export async function connectMongoDB() {
  try {
    // Reuse the existing connection if already connected
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}