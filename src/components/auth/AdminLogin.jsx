import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Shield, Users, BarChart3 } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password, 'admin');
    
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const adminFeatures = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Student Management",
      description: "Manage student registrations and track progress"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Secure Assessment",
      description: "Anti-fraud measures and secure exam delivery"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="flex">
        {/* Left Panel - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-800 to-blue-800 p-12 items-center">
          <div className="max-w-md text-white">
            <div className="flex items-center mb-8">
              <Shield className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-3xl font-bold">Admin Portal</h1>
            </div>
            <p className="text-xl text-purple-100 mb-12">
              Comprehensive assessment management platform with advanced analytics and secure delivery.
            </p>
            
            <div className="space-y-6">
              {adminFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-purple-200">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="flex justify-center lg:hidden">
                <Shield className="h-12 w-12 text-yellow-400" />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-white">Admin Access</h2>
              <p className="mt-2 text-sm text-gray-300">
                Secure portal for assessment administrators
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-white border-opacity-20">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-3 bg-white bg-opacity-10 border border-gray-300 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white placeholder-gray-300"
                      placeholder="Enter your admin email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 w-full px-3 py-3 bg-white bg-opacity-10 border border-gray-300 border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all text-white placeholder-gray-300"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Authenticating...' : 'Access Admin Portal'}
                </button>

                {/* <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    ← Back to Student Login
                  </Link>
                </div> */}
              </form>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-400">
                Authorized personnel only. All activities are logged and monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;