// pages/auth.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Shield, Hospital, AlertCircle } from 'lucide-react';

const AdminAuth = ({ onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock admin credentials (replace with your API call)
  const ADMIN_CREDENTIALS = {
    email: 'admin@hospital.com',
    password: 'admin123'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate credentials
      if (formData.email === ADMIN_CREDENTIALS.email && 
          formData.password === ADMIN_CREDENTIALS.password) {
        
        const adminUser = {
          id: 1,
          email: formData.email,
          name: 'Dr. Admin',
          role: 'Hospital Administrator',
          permissions: ['read', 'write', 'delete', 'manage_users'],
          loginTime: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        // Store in sessionStorage (replace with secure token storage)
        sessionStorage.setItem('hospitalAdmin', JSON.stringify(adminUser));
        sessionStorage.setItem('adminToken', 'mock-jwt-token-12345');
        
        // Call success callback
        if (onAuthSuccess) {
          onAuthSuccess(adminUser);
        }
        
      } else {
        setError('Invalid email or password. Please check your credentials.');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Hospital className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-blue-100 text-sm">Hospital Management System</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm">Please sign in to your admin account</p>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Enter your admin email"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 text-sm font-medium">Authentication Failed</p>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.email || !formData.password}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Sign In to Admin Panel
                  </div>
                )}
              </button>

              {/* Security Notice */}
              <div className="text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure admin access - This session will be monitored
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Credentials Card */}
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
              Demo Mode
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Test Credentials:</h3>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Email:</span>
                <code className="text-xs bg-white px-2 py-1 rounded border text-gray-800">
                  admin@hospital.com
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-600">Password:</span>
                <code className="text-xs bg-white px-2 py-1 rounded border text-gray-800">
                  admin123
                </code>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              In production, integrate with your authentication API
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            © 2024 Hospital Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// Auth utility functions that you can import in other components
export const authUtils = {
  // Check if admin is authenticated
  isAuthenticated: () => {
    const token = sessionStorage.getItem('adminToken');
    const user = sessionStorage.getItem('hospitalAdmin');
    return !!(token && user);
  },

  // Get current admin user
  getCurrentUser: () => {
    const userStr = sessionStorage.getItem('hospitalAdmin');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get auth token
  getToken: () => {
    return sessionStorage.getItem('adminToken');
  },

  // Logout admin
  logout: () => {
    sessionStorage.removeItem('hospitalAdmin');
    sessionStorage.removeItem('adminToken');
    window.location.reload();
  },

  // Check if user has specific permission
  hasPermission: (permission) => {
    const user = authUtils.getCurrentUser();
    return user?.permissions?.includes(permission) || false;
  }
};

export default AdminAuth;