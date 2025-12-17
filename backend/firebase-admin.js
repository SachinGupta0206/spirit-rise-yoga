import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // For now, initialize without service account for testing
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    console.log("🔥 Firebase Admin initialized (basic mode)");
  } catch (error) {
    console.log("⚠️ Firebase Admin initialization skipped:", error.message);
  }
}

export { admin };
