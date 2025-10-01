import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";
import DashboardStats from "./DashboardStats";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { getAuthHeaders } = useAuth();

  const [users, setUsers] = useState({
    iso: [],
    club: [],
    career: [],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const headers = getAuthHeaders();

        const isoRes = await axios.get("https://iqlabs-server.onrender.com/api/iso/users", {
          headers,
        });

        const clubRes = await axios.get("https://iqlabs-server.onrender.com/api/clubs/users", {
          headers,
        });

        const careerRes = await axios.get("https://iqlabs-server.onrender.com/api/career/users", {
          headers,
        });

        setUsers({
          iso: isoRes.data || [],
          club: clubRes.data || [],
          career: careerRes.data || [],
        });
      } catch (err) {
        console.error("Error fetching users:", err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, [getAuthHeaders]);

  const serviceTitles = {
    iso: "ISO Certificate Consultation",
    club: "Join the Club",
    career: "Career Counselling & Guidance",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab="dashboard"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-y-auto">
        <DashboardStats users={users} serviceTitles={serviceTitles} />
      </div>
    </div>
  );
};

export default AdminDashboard;