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
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Connection error:", err));

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
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: "Registration saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Base route for health check
app.get("/", (req, res) => {
  res.send("YogaCamp Backend API is running...");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
