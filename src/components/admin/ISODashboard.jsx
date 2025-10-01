import React, { useState, useEffect } from "react";
import axios from "axios";
import { Shield } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "./Sidebar";
import UserTable from "./UserTable";
import UserDetailsModal from "./UserDetailsModal";

const ISODashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [emailStatus, setEmailStatus] = useState({});
  const { getAuthHeaders } = useAuth();

  const [isoUsers, setIsoUsers] = useState([]);

  useEffect(() => {
    const fetchIsoUsers = async () => {
      try {
        const headers = getAuthHeaders();
        const response = await axios.get("https://iqlabs-server.onrender.com/api/iso/users", {
          headers,
        });
        setIsoUsers(response.data || []);
      } catch (err) {
        console.error("Error fetching ISO users:", err.response?.data || err.message);
      }
    };

    fetchIsoUsers();
  }, [getAuthHeaders]);

  const serviceIcons = {
    iso: Shield,
  };

  const serviceTitles = {
    iso: "ISO Certificate Consultation",
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
        activeTab="iso"
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-y-auto">
        <UserTable
          serviceType="iso"
          serviceUsers={isoUsers}
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

export default ISODashboard;