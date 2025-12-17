// Environment configuration
export const config = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",

  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },

  // Firebase Configuration
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },

  // Environment info
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,

  // External Links
  whatsappLink: "https://chat.whatsapp.com/CxkVX14yHcrLRpMoDVftMN",
  appDownloadLink: "http://svastha.fit/download",
};

// Validation
if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error("Missing Supabase configuration");
}

console.log(`🚀 App running in ${config.mode} mode`);
console.log(`📡 API Base URL: ${config.apiBaseUrl}`);
