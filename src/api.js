// src/api.js
import BASE_URL from "./http";

const ISO_BASE = `${BASE_URL}/api/iso`;

export const registerIsoUser = async (userData) => {
  try {
    const response = await fetch(`${ISO_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
