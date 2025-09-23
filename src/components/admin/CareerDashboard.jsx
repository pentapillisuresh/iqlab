import React, { useState, useEffect } from "react";
import axios from "axios";
import { Briefcase } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";
import UserTable from "./UserTable";
import UserDetailsModal from "./UserDetailsModal";

const CareerDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [emailStatus, setEmailStatus] = useState({});
  const { getAuthHeaders } = useAuth();

  const [careerUsers, setCareerUsers] = useState([]);

  useEffect(() => {
    const fetchCareerUsers = async () => {
      try {
        const headers = getAuthHeaders();
        const response = await axios.get("https://iqlab-backend.onrender.com/api/career/users", {
          headers,
        });
        setCareerUsers(response.data || []);
      } catch (err) {
        console.error("Error fetching Career users:", err.response?.data || err.message);
      }
    };

    fetchCareerUsers();
  }, [getAuthHeaders]);

  const serviceIcons = {
    career: Briefcase,
  };

  const serviceTitles = {
    career: "Career Counselling & Guidance",
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSendResult = (userId) => {
    setEmailStatus((prev) => ({ ...prev, [userId]: "sent" }));
    setTimeout(() => {
      alert("Email sent successfully! User will receive a notification.");
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab="career"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-y-auto">
        <UserTable
          serviceType="career"
          serviceUsers={careerUsers}
          serviceIcons={serviceIcons}
          serviceTitles={serviceTitles}
          categoryLabels={{}}
          emailStatus={emailStatus}
          onViewUser={handleViewUser}
          onSendResult={handleSendResult}
        />
      </div>

      <UserDetailsModal
        selectedUser={selectedUser}
        showModal={showModal}
        onClose={handleCloseModal}
        categoryLabels={{}}
        emailStatus={emailStatus}
        onSendResult={handleSendResult}
      />
    </div>
  );
};

export default CareerDashboard;