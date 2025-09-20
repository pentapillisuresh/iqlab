import React from 'react';
import { Shield, Users, Briefcase, Menu, X, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    const routes = {
      dashboard: '/admin/dashboard',
      iso: '/admin/iso',
      club: '/admin/club',
      career: '/admin/career',
    };
    
    navigate(routes[tab]); // ✅ SPA navigation (no reload)
  };

  return (
    <div className={`bg-blue-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-blue-200 transition-colors"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      <nav className="mt-5">
        <button
          onClick={() => handleNavigation('dashboard')}
          className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'dashboard' 
              ? 'bg-blue-800 border-r-4 border-blue-300' 
              : 'hover:bg-blue-800'
          }`}
        >
          <Home className="h-5 w-5 mr-2" />
          {sidebarOpen && 'Dashboard Overview'}
        </button>

        <button
          onClick={() => handleNavigation('iso')}
          className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'iso' 
              ? 'bg-blue-800 border-r-4 border-blue-300' 
              : 'hover:bg-blue-800'
          }`}
        >
          <Shield className="h-5 w-5 mr-2" />
          {sidebarOpen && 'ISO Certificates'}
        </button>

        <button
          onClick={() => handleNavigation('club')}
          className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'club' 
              ? 'bg-blue-800 border-r-4 border-blue-300' 
              : 'hover:bg-blue-800'
          }`}
        >
          <Users className="h-5 w-5 mr-2" />
          {sidebarOpen && 'Club Members'}
        </button>

        <button
          onClick={() => handleNavigation('career')}
          className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'career' 
              ? 'bg-blue-800 border-r-4 border-blue-300' 
              : 'hover:bg-blue-800'
          }`}
        >
          <Briefcase className="h-5 w-5 mr-2" />
          {sidebarOpen && 'Career Guidance'}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
