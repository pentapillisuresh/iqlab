import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { User, LogOut, Shield } from "lucide-react";

const Header = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/images/logo.png"
              alt="IQ Labs"
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
            />
            <div className="leading-tight">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-wide">
                IQ LABS
              </h3>
              <p className="text-gray-500 text-xs font-medium">
                The science of success
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {/* Public Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors group ${location.pathname === link.path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                  }`}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                ></span>
              </Link>
            ))}

            {/* Authenticated vs Guest */}
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isAdminRoute
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-blue-600 hover:text-white"
                      }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    to="/student/dashboard"
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                )}

                {/* User + Logout */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-5">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
                >
                  Student Login
                </Link>
                <Link
                  to="/admin/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300"
                >
                  Admin Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transform transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
