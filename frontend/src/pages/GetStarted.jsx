import React, { useState } from "react";
import { User, UserCheck, Heart, Shield, Calendar, FileText, Stethoscope, Users, ArrowLeft } from "lucide-react";

const GetStarted = () => {
  const [userType, setUserType] = useState(null);

  const handleBackToLanding = () => {
    // Navigate to landing page
    window.location.href = '/';
  };

  const handleContinuePatient = () => {
    // Navigate to patient login/register page
    window.location.href = '/Plogin';
  };

  const handleContinueProvider = () => {
    // Navigate to provider login/register page  
    window.location.href = '/dlogin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      {/* Back to Landing Button */}
      <div className="max-w-4xl mx-auto pt-4">
        <button
            onClick={handleBackToLanding}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow transition-colors duration-200 mb-4 px-3 py-2 rounded-lg group"
            // Added px-3 py-2 rounded-lg for better hover bg, and group for icon effect
        >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            {/* Icon slides left on hover */}
            <span className="font-medium">Back to Home</span>
        </button>
        </div>
      
      <div className="max-w-4xl mx-auto pt-4">
        {!userType ? (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 shadow-lg">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome to <span className="text-blue-600">MediCare</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your comprehensive healthcare management platform. Choose your role to get started with personalized features.
              </p>
            </div>

            {/* User Type Cards */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Patient Card */}
              <div 
                onClick={handleContinuePatient}
                className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-100 h-full">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Patient Portal</h3>
                      <p className="text-gray-600 text-lg mb-6">
                        Access your health records, book appointments, and manage your wellness journey
                      </p>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span>Schedule & manage appointments</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span>View medical records & reports</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span>Secure health data management</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleContinuePatient}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform group-hover:scale-105 shadow-lg"
                    >
                      Continue as Patient
                    </button>
                  </div>
                </div>
              </div>

              {/* Healthcare Provider Card */}
              <div 
                onClick={handleContinueProvider}
                className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-gray-100 h-full">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <UserCheck className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Healthcare Provider</h3>
                      <p className="text-gray-600 text-lg mb-6">
                        Comprehensive tools for patient care, appointment management, and medical documentation
                      </p>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Users className="w-5 h-5 text-emerald-500" />
                        <span>Manage patient records & care</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Calendar className="w-5 h-5 text-emerald-500" />
                        <span>Schedule & track appointments</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <FileText className="w-5 h-5 text-emerald-500" />
                        <span>Digital prescriptions & reports</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleContinueProvider}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform group-hover:scale-105 shadow-lg"
                    >
                      Continue as Provider
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mt-12 border border-gray-200">
              <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-medium">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Trusted by 10k+ Users</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
                {userType === "patient" ? (
                  <User className="w-10 h-10 text-white" />
                ) : (
                  <UserCheck className="w-10 h-10 text-white" />
                )}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome aboard! 
              </h2>
              <h3 className="text-xl text-gray-700 mb-6">
                {userType === "patient"
                  ? "Let's set up your patient account"
                  : "Let's set up your healthcare provider account"}
              </h3>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <p className="text-gray-600 text-lg">
                  {userType === "patient"
                    ? "You'll be able to book appointments, access your medical records, communicate with healthcare providers, and manage your health information securely."
                    : "You'll have access to patient management tools, appointment scheduling, medical record systems, and comprehensive healthcare administration features."}
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={userType === "patient" ? handleContinuePatient : handleContinueProvider}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Continue Registration
                </button>
                
                <button
                  className="w-full bg-gray-100 text-gray-700 py-4 px-8 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
                  onClick={() => setUserType(null)}
                >
                  Back to Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetStarted;