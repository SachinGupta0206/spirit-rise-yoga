import { config } from "./config";

const API_BASE_URL = config.apiBaseUrl;

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  already_registered?: boolean;
}

// Simple registration - directly register user
export const registerUser = async (
  name: string,
  email: string
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
};
