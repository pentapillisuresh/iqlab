import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Users, Briefcase, Award } from 'lucide-react';

function Login() {
  const [userType, setUserType] = useState('club');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ⚡ IMPORTANT: Use the correct backend base URL
  // If backend is running at 127.0.0.1:5000, replace below
  const API_BASE_URL = 'https://iqlabs-server.onrender.com';

  const userTypes = [
    { id: 'club', label: 'Club User', icon: Users, endpoint: '/api/clubs/login' },
    { id: 'career', label: 'Career User', icon: Briefcase, endpoint: '/api/career/login' },
    { id: 'iso', label: 'ISO User', icon: Award, endpoint: '/api/iso/login' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const selectedType = userTypes.find(type => type.id === userType);

    try {
      const response = await fetch(`${API_BASE_URL}${selectedType.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userType', userType);

        // ✅ Redirect logic based on user type
        setTimeout(() => {
          if (userType === 'career') {
            window.location.href = '/student/payment/1'; // <-- mock examId or dynamic examId
          } else {
            window.location.href = '/dashboard';
          }
        }, 1000);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }

    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check backend URL or CORS config.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* User type selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select User Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {userTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setUserType(type.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${userType === type.id
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                      }`}
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-xs font-medium text-center">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
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
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Register link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Register here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
