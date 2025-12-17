import { supabase } from "./supabase.js";
import dotenv from "dotenv";

dotenv.config();

async function testSetup() {
  console.log("🧪 Testing Backend Setup...\n");

  // Test 1: Environment Variables
  console.log("1. Environment Variables:");
  console.log(
    "   SUPABASE_URL:",
    process.env.SUPABASE_URL ? "✅ Set" : "❌ Missing"
  );
  console.log(
    "   SUPABASE_ANON_KEY:",
    process.env.SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"
  );
  console.log(
    "   FIREBASE_PROJECT_ID:",
    process.env.FIREBASE_PROJECT_ID ? "✅ Set" : "❌ Missing"
  );

  // Test 2: Supabase Connection
  console.log("\n2. Supabase Connection:");
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("count")
      .limit(1);
    if (error) throw error;
    console.log("   ✅ Supabase connected successfully");
    console.log("   ✅ Profiles table exists");
  } catch (error) {
    console.log("   ❌ Supabase connection failed:", error.message);
  }

  // Test 3: Check if yoga_registrations table exists
  console.log("\n3. Database Schema:");
  try {
    const { data, error } = await supabase
      .from("yoga_registrations")
      .select("count")
      .limit(1);
    if (error) throw error;
    console.log("   ✅ yoga_registrations table exists");
  } catch (error) {
    console.log("   ❌ yoga_registrations table missing:", error.message);
    console.log("   📝 Run the SQL in database-schema.sql");
  }

  // Test 4: Firebase Admin (basic check)
  console.log("\n4. Firebase Configuration:");
  try {
    const { admin } = await import("./firebase-admin.js");
    console.log("   ✅ Firebase Admin SDK loaded");
  } catch (error) {
    console.log("   ❌ Firebase Admin failed:", error.message);
  }

  console.log("\n🏁 Setup test complete!");
}

testSetup().catch(console.error);
