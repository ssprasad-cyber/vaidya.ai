import React, { useState } from 'react';
import { User, Lock, Mail, Phone, Calendar, MapPin, Eye, EyeOff, Stethoscope, GraduationCap, Award, Shield, Building, Clock, UserCheck } from 'lucide-react';

const DoctorAuth = () => {
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
    licenseNumber: '',
    specialization: '',
    experience: '',
    education: '',
    hospitalAffiliation: '',
    consultationFee: '',
    availability: '',
    emergencyContact: '',
    emergencyPhone: '',
    about: ''
  });

  const [errors, setErrors] = useState({});

  const specializations = [
    'Cardiology', 'Dermatology', 'Emergency Medicine', 'Endocrinology',
    'Gastroenterology', 'General Medicine', 'Neurology', 'Oncology',
    'Orthopedics', 'Pediatrics', 'Psychiatry', 'Radiology',
    'Surgery', 'Urology', 'Gynecology', 'Ophthalmology'
  ];

  const availabilityOptions = [
    'Monday - Friday (9 AM - 5 PM)',
    'Monday - Saturday (10 AM - 6 PM)',
    'Weekdays + Evening (9 AM - 8 PM)',
    '24/7 Emergency Available',
    'Appointment Only',
    'Custom Schedule'
  ];

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      // Registration specific validations
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.licenseNumber) newErrors.licenseNumber = 'Medical license number is required';
      if (!formData.specialization) newErrors.specialization = 'Specialization is required';
      if (!formData.experience) newErrors.experience = 'Years of experience is required';
      if (!formData.education) newErrors.education = 'Medical education details are required';
      if (!formData.consultationFee) newErrors.consultationFee = 'Consultation fee is required';
      
      // Confirm password validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      // License number format validation (basic)
      if (formData.licenseNumber && formData.licenseNumber.length < 6) {
        newErrors.licenseNumber = 'Please enter a valid license number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        console.log('Doctor login attempt:', { email: formData.email, password: formData.password });
        alert('Doctor login successful! (This is a demo)');
      } else {
        console.log('Doctor registration attempt:', formData);
        alert('Doctor registration successful! Pending verification. (This is a demo)');
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
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );

  const TextAreaField = ({ icon: Icon, name, placeholder, value, onChange, error, rows = 3 }) => (
    <div className="relative">
      <div className="relative">
        <Icon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
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
          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side - Professional Branding */}
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-full">
                  <Stethoscope className="w-12 h-12 text-white" />
                </div>
                <div className="ml-4">
                  <h1 className="text-4xl font-bold text-gray-800">Vaidya.Ai</h1>
                  <p className="text-gray-600">Healthcare Professional Portal</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {isLogin ? 'Welcome Back, Doctor!' : 'Join Our Medical Network'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-700">HIPAA Compliant & Secure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700">Patient Management System</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">Advanced Scheduling Tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-orange-600" />
                  <span className="text-gray-700">Professional Certification Verified</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Why Choose Vaidya.Ai?</h3>
              <ul className="space-y-2 text-sm">
                <li>• Streamlined patient management</li>
                <li>• Digital prescription system</li>
                <li>• Telemedicine capabilities</li>
                <li>• Revenue tracking & analytics</li>
                <li>• 24/7 technical support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3 rounded-full">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="ml-3">
                  <h1 className="text-2xl font-bold text-gray-800">Vaidya.Ai</h1>
                  <p className="text-gray-600 text-sm">Healthcare Professional Portal</p>
                </div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
              <button
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  isLogin 
                    ? 'bg-white text-emerald-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  !isLogin 
                    ? 'bg-white text-emerald-600 shadow-sm' 
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
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="space-y-4">
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

                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          icon={Phone}
                          name="phone"
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          error={errors.phone}
                        />
                        <InputField
                          icon={Calendar}
                          name="dateOfBirth"
                          type="date"
                          placeholder="Date of Birth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          error={errors.dateOfBirth}
                        />
                      </div>

                      <InputField
                        icon={MapPin}
                        name="address"
                        placeholder="Professional Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={errors.address}
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Professional Details
                    </h3>
                    <div className="space-y-4">
                      <InputField
                        icon={Award}
                        name="licenseNumber"
                        placeholder="Medical License Number"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        error={errors.licenseNumber}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          icon={Stethoscope}
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleInputChange}
                          error={errors.specialization}
                        >
                          <select
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select Specialization</option>
                            {specializations.map(spec => (
                              <option key={spec} value={spec}>{spec}</option>
                            ))}
                          </select>
                        </InputField>
                        <InputField
                          icon={Clock}
                          name="experience"
                          type="number"
                          placeholder="Years of Experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          error={errors.experience}
                        />
                      </div>

                      <InputField
                        icon={GraduationCap}
                        name="education"
                        placeholder="Medical Education (MBBS, MD, etc.)"
                        value={formData.education}
                        onChange={handleInputChange}
                        error={errors.education}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          icon={Building}
                          name="hospitalAffiliation"
                          placeholder="Hospital Affiliation (Optional)"
                          value={formData.hospitalAffiliation}
                          onChange={handleInputChange}
                          error={errors.hospitalAffiliation}
                        />
                        <InputField
                          icon={User}
                          name="consultationFee"
                          type="number"
                          placeholder="Consultation Fee ($)"
                          value={formData.consultationFee}
                          onChange={handleInputChange}
                          error={errors.consultationFee}
                        />
                      </div>

                      <InputField
                        icon={Clock}
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        error={errors.availability}
                      >
                        <select
                          name="availability"
                          value={formData.availability}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        >
                          <option value="">Select Availability</option>
                          {availabilityOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </InputField>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Emergency Contact
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        icon={User}
                        name="emergencyContact"
                        placeholder="Emergency Contact Name"
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
                  </div>

                  {/* About Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Professional Bio
                    </h3>
                    <TextAreaField
                      icon={User}
                      name="about"
                      placeholder="Brief description about your practice and expertise (Optional)"
                      value={formData.about}
                      onChange={handleInputChange}
                      error={errors.about}
                      rows={4}
                    />
                  </div>
                </>
              )}

              {/* Login/Account Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Account Details
                </h3>
                <div className="space-y-4">
                  <InputField
                    icon={Mail}
                    name="email"
                    type="email"
                    placeholder="Professional Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />

                  <PasswordField
                    name="password"
                    placeholder={isLogin ? "Password" : "Create Password (min. 8 characters)"}
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
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-emerald-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {isLogin ? 'Sign In to Dashboard' : 'Register as Healthcare Professional'}
              </button>

              {/* Verification Notice */}
              {!isLogin && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-amber-600 mr-2" />
                    <p className="text-amber-800 text-sm">
                      <strong>Verification Required:</strong> Your medical license and credentials will be verified before account activation (24-48 hours).
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Links */}
              <div className="text-center space-y-3">
                {isLogin && (
                  <button
                    type="button"
                    className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                  >
                    Forgot your password?
                  </button>
                )}
                
                <p className="text-gray-600 text-sm">
                  {isLogin ? "New to Vaidya.Ai? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-emerald-600 hover:text-emerald-800 font-medium"
                  >
                    {isLogin ? 'Register as a Doctor' : 'Sign In Here'}
                  </button>
                </p>

                <p className="text-xs text-gray-500">
                  By {isLogin ? 'signing in' : 'registering'}, you agree to our{' '}
                  <button className="text-emerald-600 hover:underline">Terms of Service</button> and{' '}
                  <button className="text-emerald-600 hover:underline">Privacy Policy</button>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>© 2024 Vaidya.Ai. All rights reserved.</p>
            <p>Secure platform for healthcare professionals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAuth;