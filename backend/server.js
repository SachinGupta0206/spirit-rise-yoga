import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./supabase.js";
// Firebase admin import removed - not currently used

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://spiritriseyoga.com", "https://campaign.svastha.fit"]
      : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ✅ Base route for health check
app.get("/", (req, res) => {
  res.send("YogaCamp Backend API is running with Supabase...");
});

// ✅ Simple registration - directly store in yoga_registrations table
app.post("/api/register", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    console.log("📝 Registering user:", { name, email });

    // Check if already registered
    const { data: existingRegistration } = await supabase
      .from("yoga_registrations")
      .select("id, name")
      .eq("email", email)
      .single();

    if (existingRegistration) {
      console.log("✅ User already registered");
      return res.json({
        success: true,
        message: `${existingRegistration.name} is already registered for yoga camp`,
        already_registered: true,
      });
    }

    // Register for yoga camp
    // Generate a unique dummy phone since phone is required in current table structure
    const dummyPhone = `+91${Date.now().toString().slice(-10)}`;

    const { error } = await supabase.from("yoga_registrations").insert({
      name,
      email,
      phone: dummyPhone, // Generate dummy phone since column is NOT NULL UNIQUE
      user_id: null, // Not linking to users table for now
      whatsapp_joined: false,
      app_installed: false,
    });

    if (error) {
      console.error("❌ Registration error:", error);
      return res.status(500).json({ error: "Failed to register" });
    }

    console.log("✅ Registration successful");
    res.json({
      success: true,
      message: `${name} successfully registered for yoga camp!`,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔍 Debug endpoint
app.get("/api/debug", (req, res) => {
  res.json({
    supabaseUrl: process.env.SUPABASE_URL ? "Set" : "Not Set",
    supabaseKey: process.env.SUPABASE_ANON_KEY ? "Set" : "Not Set",
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `🔗 Supabase URL: ${
      process.env.SUPABASE_URL ? "Connected" : "Not configured"
    }`
  );
});
