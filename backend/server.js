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
  res.send("YogaCamp Backend API is running with Supabase + Firebase...");
});

// ✅ Simple registration - directly store in yoga_registrations table
app.post("/api/register", async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    console.log("📝 Registering user:", { name, phone, email });

    // Check if already registered
    const { data: existingRegistration } = await supabase
      .from("yoga_registrations")
      .select("id, name")
      .eq("phone", phone)
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
    const { error } = await supabase.from("yoga_registrations").insert({
      name,
      phone,
      email: email || null,
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
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID ? "Set" : "Not Set",
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
  console.log(
    `🔥 Firebase Project: ${
      process.env.FIREBASE_PROJECT_ID || "Not configured"
    }`
  );
});
