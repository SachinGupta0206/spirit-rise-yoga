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

// ✅ Check if user is already registered for yoga camp
app.post("/api/check-registration", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    console.log("🔍 Checking registration status for phone:", phone);

    const { data: registration, error } = await supabase
      .from("yoga_registrations")
      .select("name, phone, created_at")
      .eq("phone", phone)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      registered: !!registration,
      name: registration?.name,
      phone: registration?.phone,
      registered_at: registration?.created_at,
    });
  } catch (err) {
    console.error("❌ Check registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Check if user exists in Svastha database
app.post("/api/check-user", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    console.log("🔍 Checking user existence for phone:", phone);

    const { data: user, error } = await supabase
      .from("profiles")
      .select("id, full_name, phone, email")
      .eq("phone", phone)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("❌ Supabase error:", error);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      exists: !!user,
      user_id: user?.id,
      name: user?.full_name,
      email: user?.email,
    });
  } catch (err) {
    console.error("❌ Check user error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Register existing user (no OTP needed)
app.post("/api/register-existing", async (req, res) => {
  try {
    const { phone, user_id, name, email } = req.body;

    if (!phone || !user_id || !name) {
      return res
        .status(400)
        .json({ error: "Phone, user_id, and name are required" });
    }

    // Check if already registered
    const { data: existingRegistration } = await supabase
      .from("yoga_registrations")
      .select("id")
      .eq("phone", phone)
      .single();

    if (existingRegistration) {
      console.log("✅ User already registered, returning success");
      return res.json({
        success: true,
        message: "Already registered for yoga camp",
        already_registered: true,
      });
    }

    // Register for yoga camp
    const { error } = await supabase.from("yoga_registrations").insert({
      name,
      phone,
      email: email || null,
      user_id,
    });

    if (error) {
      console.error("❌ Registration error:", error);
      return res.status(500).json({ error: "Failed to register" });
    }

    res.json({ success: true, message: "Registration successful" });
  } catch (err) {
    console.error("❌ Register existing user error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Send OTP for new users
app.post("/api/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    console.log("📱 Sending OTP to:", phone);

    // Simulate OTP sending (replace with real SMS/Firebase in production)
    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("❌ Send OTP error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ✅ Verify OTP and register new user
app.post("/api/verify-and-register", async (req, res) => {
  try {
    const { phone, otp, name, email } = req.body;

    if (!phone || !otp || !name) {
      return res
        .status(400)
        .json({ error: "Phone, OTP, and name are required" });
    }

    console.log("🔐 Verifying OTP for:", phone);

    // Simulate OTP verification (accept any 6-digit OTP)
    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({ error: "Invalid OTP format" });
    }

    console.log("✅ OTP verified, creating user...");

    // Create user in profiles table
    const { data: newUser, error: userError } = await supabase
      .from("profiles")
      .insert({
        phone,
        full_name: name,
        email: email || null,
        membership_type: "basic",
        join_date: new Date().toISOString().split("T")[0],
        registration_country: "IN",
        registration_currency: "INR",
      })
      .select()
      .single();

    if (userError) {
      console.error("❌ User creation error:", userError);
      return res.status(500).json({ error: "Failed to create user" });
    }

    // Register for yoga camp
    const { error: registrationError } = await supabase
      .from("yoga_registrations")
      .insert({
        name,
        phone,
        email: email || null,
        user_id: newUser.id,
      });

    if (registrationError) {
      console.error("❌ Yoga registration error:", registrationError);
      return res
        .status(500)
        .json({ error: "Failed to register for yoga camp" });
    }

    res.json({
      success: true,
      user_id: newUser.id,
      message: "User created and registered successfully",
    });
  } catch (err) {
    console.error("❌ Verify and register error:", err);
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
