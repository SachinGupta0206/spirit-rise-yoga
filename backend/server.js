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

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
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

    await registration.save();
    console.log("✅ Registration saved successfully:", registration);

    res.status(201).json({
      message: "Registration saved successfully",
      data: registration,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
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
