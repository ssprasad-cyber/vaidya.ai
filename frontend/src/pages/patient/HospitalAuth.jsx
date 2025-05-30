import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Calendar, MapPin, Eye, EyeOff, Heart, Shield } from 'lucide-react';

const HospitalAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodGroup: '',
    allergies: ''
  });

  const [errors, setErrors] = useState({});

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      // Registration specific validations
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required';
      if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Emergency phone is required';
      
      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        console.log('Login attempt:', { email: formData.email, password: formData.password });
        alert('Login successful! (This is a demo)');
      } else {
        console.log('Registration attempt:', formData);
        alert('Registration successful! (This is a demo)');
      }
    }
  };

  const InputField = ({ icon: Icon, name, type = 'text', placeholder, value, onChange, error, children }) => (
    <div className="relative">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        {children || (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  const PasswordField = ({ name, placeholder, value, onChange, error, showPassword, toggleShow }) => (
    <div className="relative">
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <button
          type="button"
          onClick={toggleShow}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-4xl font-bold text-gray-800">MediCare</h1>
                <p className="text-gray-600">Hospital Management System</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {isLogin ? 'Welcome Back!' : 'Join Our Healthcare Community'}
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700">Secure & HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">24/7 Online Appointment Booking</span>
              </div>
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-purple-600" />
                <span className="text-gray-700">Access Medical Records Anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-2xl font-bold text-gray-800">MediCare</h1>
                  <p className="text-gray-600 text-sm">Hospital Management</p>
                </div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <div className="space-y-6">
              
              {/* Registration Fields */}
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      icon={User}
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                    />
                    <InputField
                      icon={User}
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                    />
                  </div>

                  <InputField
                    icon={Phone}
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      icon={Calendar}
                      name="dateOfBirth"
                      type="date"
                      placeholder="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      error={errors.dateOfBirth}
                    />
                    <InputField
                      icon={Heart}
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      error={errors.bloodGroup}
                    >
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </InputField>
                  </div>

                  <InputField
                    icon={MapPin}
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      icon={User}
                      name="emergencyContact"
                      placeholder="Emergency Contact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      error={errors.emergencyContact}
                    />
                    <InputField
                      icon={Phone}
                      name="emergencyPhone"
                      type="tel"
                      placeholder="Emergency Phone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      error={errors.emergencyPhone}
                    />
                  </div>

                  <InputField
                    icon={Heart}
                    name="allergies"
                    placeholder="Known Allergies (Optional)"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    error={errors.allergies}
                  />
                </>
              )}

              {/* Common Fields */}
              <InputField
                icon={Mail}
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />

              <PasswordField
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                showPassword={showPassword}
                toggleShow={() => setShowPassword(!showPassword)}
              />

              {!isLogin && (
                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  showPassword={showConfirmPassword}
                  toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLogin ? 'Sign In to Your Account' : 'Create Patient Account'}
              </button>

              {/* Additional Links */}
              <div className="text-center space-y-2">
                {isLogin && (
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Forgot your password?
                  </button>
                )}
                
                <p className="text-gray-600 text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isLogin ? 'Register here' : 'Login here'}
                  </button>
                </p>
            </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>© 2024 MediCare Hospital. All rights reserved.</p>
            <p>Your health data is protected and secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAuth;