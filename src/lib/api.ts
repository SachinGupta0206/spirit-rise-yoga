import { config } from "./config";

const API_BASE_URL = config.apiBaseUrl;

export interface CheckUserResponse {
  exists: boolean;
  user_id?: string;
  name?: string;
  email?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  user_id?: string;
  already_registered?: boolean;
}

// Check if user exists in Svastha database
export const checkUser = async (phone: string): Promise<CheckUserResponse> => {
  const response = await fetch(`${API_BASE_URL}/check-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  if (!response.ok) {
    throw new Error("Failed to check user");
  }

  return response.json();
};

// Send OTP to new users
export const sendOTP = async (phone: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  });

  if (!response.ok) {
    throw new Error("Failed to send OTP");
  }

  return response.json();
};

// Verify OTP and register new user
export const verifyAndRegister = async (
  phone: string,
  idToken: string,
  name: string,
  email?: string
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/verify-and-register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, idToken, name, email }),
  });

  if (!response.ok) {
    throw new Error("Failed to verify and register");
  }

  return response.json();
};

// Register existing user for yoga camp
export const registerExisting = async (
  phone: string,
  user_id: string,
  name: string,
  email?: string
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/register-existing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone, user_id, name, email }),
  });

  if (!response.ok) {
    throw new Error("Failed to register existing user");
  }

  return response.json();
};
