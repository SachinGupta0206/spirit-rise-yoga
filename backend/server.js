import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    const options = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      minPoolSize: 5,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("✅ Connected to MongoDB Atlas");

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // Don't exit process, let it retry
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// ✅ Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  batch: String,
  date: { type: Date, default: Date.now },
});

const Registration = mongoose.model("Registration", registrationSchema);

// ✅ Route
app.post("/api/register", async (req, res) => {
  try {
    console.log("📝 Registration request received:", req.body);
    console.log("🔍 MongoDB connection state:", mongoose.connection.readyState);

    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database connection not ready. Please try again.",
      });
    }

    const { name, phone, email, batch } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required." });
    }

    const registration = new Registration({
      name,
      phone: phone || "",
      email,
      batch: batch || "",
      date: new Date(),
    });

    // Set timeout for save operation
    const savePromise = registration.save();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Save operation timeout")), 15000)
    );

    const savedRegistration = await Promise.race([savePromise, timeoutPromise]);
    console.log("✅ Registration saved successfully:", savedRegistration);

    res.status(201).json({
      message: "Registration saved successfully",
      data: savedRegistration,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);

    if (err.message === "Save operation timeout") {
      return res.status(408).json({
        message: "Request timeout. Please try again.",
        error: "Database operation timed out",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// ✅ Base route for health check
app.get("/", (req, res) => {
  res.send("YogaCamp Backend API is running...");
});

// 🔍 Debug endpoint
app.get("/api/debug", (req, res) => {
  res.json({
    mongoUri: process.env.MONGO_URI ? "Set" : "Not Set",
    nodeEnv: process.env.NODE_ENV,
    mongooseState: mongoose.connection.readyState,
    mongooseStates: {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    },
  });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
