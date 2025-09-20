import React, { createContext, useContext, useState, useEffect } from "react";
import BASE_URL from "../http";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login using backend API
  const login = async (email, password, role = "admin") => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.message || "Invalid credentials" };
      }

      // Save user + token
      const userData = {
        email: data.user.email,
        role: data.user.role,
        name: data.user.name,
        token: data.token,
      };

      setUser(userData);
      localStorage.setItem("user_data", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed. Try again." };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
  };

  // Helper: return token directly
  const getToken = () => {
    return user?.token || localStorage.getItem("token");
  };

  // Helper: return Authorization headers
  const getAuthHeaders = () => {
    const token = getToken();
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const value = {
    user,
    login,
    logout,
    loading,
    getAuthHeaders,
    getToken,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isStudent: user?.role === "student",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};