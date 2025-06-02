import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Heart, 
  Wind, 
  Eye, 
  Bone, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  X,
  Stethoscope,
  FileText,
  Camera,
  Upload,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const AIPredictionPage = () => {
  const [showPopup, setShowPopup] = useState(true);

  const healthModels = [
    {
      id: 'cardio',
      name: 'Cardiovascular Risk Assessment',
      icon: Heart,
      description: 'Predicts heart disease risk based on vital signs, ECG patterns, and lifestyle factors',
      accuracy: '94.2%',
      status: 'ready',
      color: 'red',
      features: ['ECG Analysis', 'Blood Pressure Trends', 'Cholesterol Prediction', 'Arrhythmia Detection']
    },
    {
      id: 'respiratory',
      name: 'Respiratory Disease Predictor',
      icon: Wind,
      description: 'Analyzes lung function, breathing patterns, and chest X-rays for respiratory conditions',
      accuracy: '91.8%',
      status: 'ready',
      color: 'blue',
      features: ['Chest X-ray Analysis', 'Spirometry Evaluation', 'Asthma Risk', 'COPD Detection']
    },
    {
      id: 'neurological',
      name: 'Neurological Assessment AI',
      icon: Brain,
      description: 'Evaluates cognitive function, brain scans, and neurological symptoms',
      accuracy: '89.5%',
      status: 'training',
      color: 'purple',
      features: ['MRI Analysis', 'Cognitive Testing', 'Stroke Risk', 'Alzheimer\'s Screening']
    },
    {
      id: 'ophthalmology',
      name: 'Eye Disease Detection',
      icon: Eye,
      description: 'Detects diabetic retinopathy, glaucoma, and other eye conditions from retinal images',
      accuracy: '96.1%',
      status: 'ready',
      color: 'green',
      features: ['Retinal Scanning', 'Glaucoma Detection', 'Diabetic Retinopathy', 'Macular Degeneration']
    },
    {
      id: 'orthopedic',
      name: 'Orthopedic Injury Analyzer',
      icon: Bone,
      description: 'Analyzes X-rays and MRIs to detect fractures, joint problems, and bone diseases',
      accuracy: '92.7%',
      status: 'ready',
      color: 'yellow',
      features: ['Fracture Detection', 'Joint Analysis', 'Bone Density', 'Arthritis Assessment']
    },
    {
      id: 'dermatology',
      name: 'Skin Cancer Screening',
      icon: Shield,
      description: 'Identifies suspicious moles and skin lesions using advanced image recognition',
      accuracy: '93.4%',
      status: 'ready',
      color: 'orange',
      features: ['Melanoma Detection', 'Lesion Analysis', 'Skin Type Assessment', 'Risk Stratification']
    },
    {
      id: 'diabetes',
      name: 'Diabetes Risk Predictor',
      icon: Activity,
      description: 'Predicts diabetes onset and complications using glucose patterns and patient data',
      accuracy: '88.9%',
      status: 'ready',
      color: 'indigo',
      features: ['Glucose Monitoring', 'HbA1c Prediction', 'Complication Risk', 'Diet Recommendations']
    },
    {
      id: 'mental-health',
      name: 'Mental Health Assessment',
      icon: Brain,
      description: 'Evaluates depression, anxiety, and other mental health conditions',
      accuracy: '87.3%',
      status: 'beta',
      color: 'pink',
      features: ['Mood Analysis', 'Speech Pattern Recognition', 'Behavioral Assessment', 'Risk Screening']
    },
    {
      id: 'radiology',
      name: 'General Radiology AI',
      icon: Camera,
      description: 'Comprehensive medical imaging analysis for multiple organ systems',
      accuracy: '90.6%',
      status: 'training',
      color: 'teal',
      features: ['Multi-organ Analysis', 'Anomaly Detection', 'Report Generation', 'Priority Scoring']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'training': return 'text-yellow-600 bg-yellow-100';
      case 'beta': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ready': return 'Ready';
      case 'training': return 'Training';
      case 'beta': return 'Beta';
      default: return 'Unknown';
    }
  };

  const handleModelClick = (model) => {
    if (model.status !== 'ready') {
      return;
    }
    // Redirect to individual model page
    window.location.href = `/ai-models/${model.id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">AI Health Prediction Center</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Advanced AI models for comprehensive health analysis and risk prediction
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Research & Analysis Purpose Only</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            These AI models are designed for health research and analysis. Not for direct patient diagnosis.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">6</p>
              <p className="text-gray-600 text-sm">Models Ready</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-gray-600 text-sm">In Training</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">92.1%</p>
              <p className="text-gray-600 text-sm">Avg Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">9</p>
              <p className="text-gray-600 text-sm">Total Models</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {healthModels.map((model) => {
          const IconComponent = model.icon;
          const isDisabled = model.status !== 'ready';
          
          return (
            <div
              key={model.id}
              className={`bg-white rounded-xl shadow-sm border transition-all duration-200 ${
                isDisabled 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'hover:shadow-md hover:scale-105 cursor-pointer'
              }`}
              onClick={() => handleModelClick(model)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${model.color}-100`}>
                    <IconComponent className={`w-6 h-6 text-${model.color}-600`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                    {getStatusText(model.status)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{model.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Accuracy</span>
                  <span className="text-sm font-semibold text-green-600">{model.accuracy}</span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Key Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {model.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {feature}
                      </span>
                    ))}
                    {model.features.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{model.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                
                {model.status === 'ready' && (
                  <div className="mt-4">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                      Open Model →
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-white border border-yellow-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Model Training in Progress</p>
              <p className="text-xs text-gray-600 mt-1">
                Some AI models are not ready yet. We're continuously improving our prediction accuracy.
              </p>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictionPage;