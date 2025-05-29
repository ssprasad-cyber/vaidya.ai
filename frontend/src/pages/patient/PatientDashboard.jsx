import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  FileText, 
  Activity, 
  Heart, 
  Thermometer, 
  Droplets, 
  Weight,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  Pill,
  Stethoscope,
  TrendingUp,
  ChevronRight,
  Brain,
  Target,
  BarChart3,
  Zap
} from 'lucide-react';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [predictionResults, setPredictionResults] = useState({});

  // Sample patient data
  const patientData = {
    id: 'P001',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    bloodType: 'A+',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    address: '123 Main St, New York, NY 10001',
    emergencyContact: 'John Johnson - +1 (555) 987-6543',
    insurance: 'Blue Cross Blue Shield',
    primaryDoctor: 'Dr. Michael Chen'
  };

  const vitalSigns = {
    bloodPressure: { value: '120/80', status: 'normal', unit: 'mmHg' },
    heartRate: { value: '72', status: 'normal', unit: 'bpm' },
    temperature: { value: '98.6', status: 'normal', unit: '°F' },
    weight: { value: '145', status: 'stable', unit: 'lbs' },
    oxygenSaturation: { value: '98', status: 'normal', unit: '%' }
  };

  const upcomingAppointments = [
    {
      id: 1,
      date: '2024-05-28',
      time: '10:00 AM',
      doctor: 'Dr. Michael Chen',
      type: 'Regular Checkup',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2024-06-05',
      time: '2:30 PM',
      doctor: 'Dr. Lisa Park',
      type: 'Cardiology Consultation',
      status: 'pending'
    },
    {
      id: 3,
      date: '2024-06-12',
      time: '9:15 AM',
      doctor: 'Dr. James Wilson',
      type: 'Lab Results Review',
      status: 'confirmed'
    }
  ];

  const medications = [
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Michael Chen',
      startDate: '2024-03-15',
      refillsLeft: 2
    },
    {
      id: 2,
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribedBy: 'Dr. Michael Chen',
      startDate: '2024-02-20',
      refillsLeft: 1
    }
  ];

  const recentTests = [
    {
      id: 1,
      test: 'Complete Blood Count',
      date: '2024-05-15',
      status: 'Normal',
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 2,
      test: 'Lipid Panel',
      date: '2024-05-15',
      status: 'Slightly Elevated',
      doctor: 'Dr. Michael Chen'
    },
    {
      id: 3,
      test: 'HbA1c',
      date: '2024-04-20',
      status: 'Normal',
      doctor: 'Dr. Michael Chen'
    }
  ];

  const predictionModels = [
    {
      id: 'diabetes',
      name: 'Diabetes Risk Prediction',
      description: 'Assess risk of developing Type 2 diabetes based on current health metrics',
      icon: Target,
      color: 'bg-red-100 text-red-600',
      factors: ['BMI', 'Blood Pressure', 'Family History', 'Age', 'Activity Level']
    },
    {
      id: 'cardiovascular',
      name: 'Cardiovascular Risk Assessment',
      description: 'Evaluate 10-year risk of heart disease and stroke',
      icon: Heart,
      color: 'bg-pink-100 text-pink-600',
      factors: ['Cholesterol', 'Blood Pressure', 'Smoking Status', 'Age', 'Gender']
    },
    {
      id: 'hypertension',
      name: 'Hypertension Risk Model',
      description: 'Predict likelihood of developing high blood pressure',
      icon: Activity,
      color: 'bg-orange-100 text-orange-600',
      factors: ['Current BP', 'Weight', 'Salt Intake', 'Stress Level', 'Exercise']
    },
    {
      id: 'osteoporosis',
      name: 'Bone Health Prediction',
      description: 'Assess fracture risk and bone density decline',
      icon: BarChart3,
      color: 'bg-yellow-100 text-yellow-600',
      factors: ['Age', 'Gender', 'Calcium Intake', 'Exercise', 'Family History']
    },
    {
      id: 'metabolic',
      name: 'Metabolic Syndrome Risk',
      description: 'Evaluate risk for metabolic syndrome and related conditions',
      icon: Zap,
      color: 'bg-purple-100 text-purple-600',
      factors: ['Waist Circumference', 'Blood Sugar', 'Triglycerides', 'HDL', 'Blood Pressure']
    },
    {
      id: 'cognitive',
      name: 'Cognitive Health Assessment',
      description: 'Screen for early signs of cognitive decline',
      icon: Brain,
      color: 'bg-indigo-100 text-indigo-600',
      factors: ['Memory Tests', 'Age', 'Education', 'Social Activity', 'Sleep Quality']
    }
  ];

  const runPredictionModel = (modelId) => {
    setSelectedPrediction(modelId);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockResults = {
        diabetes: { risk: 'Low', percentage: 15, recommendation: 'Maintain current lifestyle with regular monitoring' },
        cardiovascular: { risk: 'Moderate', percentage: 35, recommendation: 'Consider lifestyle modifications and regular checkups' },
        hypertension: { risk: 'Low', percentage: 20, recommendation: 'Continue current exercise routine and monitor sodium intake' },
        osteoporosis: { risk: 'Low', percentage: 12, recommendation: 'Ensure adequate calcium and vitamin D intake' },
        metabolic: { risk: 'Low', percentage: 18, recommendation: 'Maintain healthy weight and regular physical activity' },
        cognitive: { risk: 'Very Low', percentage: 80, recommendation: 'Continue mental stimulation and social engagement' }
      };
      
      setPredictionResults(prev => ({
        ...prev,
        [modelId]: mockResults[modelId]
      }));
      setSelectedPrediction(null);
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'very low':
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'slightly elevated':
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const VitalCard = ({ icon: Icon, title, value, unit, status }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Patient Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, Sarah</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patient Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{patientData.name}</h2>
                  <p className="text-gray-600">Patient ID: {patientData.id}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>{patientData.age} years old</span>
                    <span>•</span>
                    <span>{patientData.gender}</span>
                    <span>•</span>
                    <span>Blood Type: {patientData.bloodType}</span>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {patientData.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {patientData.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {patientData.address}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'medications', label: 'Medications', icon: Pill },
            { id: 'predictions', label: 'AI Predictions', icon: Brain },
            { id: 'records', label: 'Medical Records', icon: FileText }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Vital Signs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <VitalCard
                  icon={Activity}
                  title="Blood Pressure"
                  value={vitalSigns.bloodPressure.value}
                  unit={vitalSigns.bloodPressure.unit}
                  status={vitalSigns.bloodPressure.status}
                />
                <VitalCard
                  icon={Heart}
                  title="Heart Rate"
                  value={vitalSigns.heartRate.value}
                  unit={vitalSigns.heartRate.unit}
                  status={vitalSigns.heartRate.status}
                />
                <VitalCard
                  icon={Thermometer}
                  title="Temperature"
                  value={vitalSigns.temperature.value}
                  unit={vitalSigns.temperature.unit}
                  status={vitalSigns.temperature.status}
                />
                <VitalCard
                  icon={Weight}
                  title="Weight"
                  value={vitalSigns.weight.value}
                  unit={vitalSigns.weight.unit}
                  status={vitalSigns.weight.status}
                />
                <VitalCard
                  icon={Droplets}
                  title="Oxygen Sat."
                  value={vitalSigns.oxygenSaturation.value}
                  unit={vitalSigns.oxygenSaturation.unit}
                  status={vitalSigns.oxygenSaturation.status}
                />
              </div>
            </div>

            {/* Recent Test Results */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Results</h3>
              <div className="bg-white rounded-lg border border-gray-200">
                {recentTests.map((test, index) => (
                  <div key={test.id} className={`p-4 ${index !== recentTests.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{test.test}</p>
                          <p className="text-sm text-gray-500">Ordered by {test.doctor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                          {test.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{test.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule New
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.type}</h4>
                        <p className="text-gray-600">{appointment.doctor}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Medication
              </button>
            </div>
            <div className="space-y-4">
              {medications.map((medication) => (
                <div key={medication.id} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Pill className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                        <p className="text-gray-600">{medication.dosage} - {medication.frequency}</p>
                        <p className="text-sm text-gray-500 mt-1">Prescribed by {medication.prescribedBy}</p>
                        <p className="text-sm text-gray-500">Started: {medication.startDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span className="text-sm text-amber-600">{medication.refillsLeft} refills left</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Request Refill
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Health Predictions</h3>
              <p className="text-gray-600">
                Advanced machine learning models to assess your health risks and provide personalized recommendations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {predictionModels.map((model) => {
                const Icon = model.icon;
                const isRunning = selectedPrediction === model.id;
                const hasResult = predictionResults[model.id];
                
                return (
                  <div key={model.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${model.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      {hasResult && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(hasResult.risk)}`}>
                          {hasResult.risk} Risk
                        </span>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">{model.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{model.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Key Factors:</p>
                      <div className="flex flex-wrap gap-1">
                        {model.factors.slice(0, 3).map((factor, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                            {factor}
                          </span>
                        ))}
                        {model.factors.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                            +{model.factors.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {hasResult && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Risk Score</span>
                          <span className="text-lg font-bold text-gray-900">{hasResult.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              hasResult.percentage <= 25 ? 'bg-green-500' :
                              hasResult.percentage <= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${hasResult.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600">{hasResult.recommendation}</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => runPredictionModel(model.id)}
                      disabled={isRunning}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        isRunning
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : hasResult
                          ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isRunning ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </div>
                      ) : hasResult ? (
                        'Run Again'
                      ) : (
                        'Run Prediction'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
            
            {Object.keys(predictionResults).length > 0 && (
              <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Health Risk Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(predictionResults).map(([modelId, result]) => {
                    const model = predictionModels.find(m => m.id === modelId);
                    return (
                      <div key={modelId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${model.color}`}>
                            <model.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{model.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(result.risk)}`}>
                          {result.percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'records' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Medical Records</h3>
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Medical Records Access</h4>
              <p className="text-gray-600 mb-4">
                Your complete medical history, lab results, and imaging reports are securely stored here.
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View All Records
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;