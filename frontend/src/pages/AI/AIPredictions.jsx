import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  Calendar,
  Bed,
  Heart,
  UserCheck,
  Clock,
  BarChart3,
  Zap,
  Shield
} from 'lucide-react';

const AIPrediction = () => {
  const [activeTab, setActiveTab] = useState('patient-outcomes');
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState({
    patientOutcomes: [],
    resourceAllocation: {},
    riskAssessment: {}
  });

  // Mock AI prediction data
  const mockPredictions = {
    patientOutcomes: [
      {
        id: 1,
        patientName: 'John Doe',
        age: 67,
        condition: 'Cardiac Surgery',
        riskLevel: 'Medium',
        recoveryTime: '7-10 days',
        successRate: 92,
        recommendations: ['Early mobilization', 'Cardiac monitoring', 'Diet modification']
      },
      {
        id: 2,
        patientName: 'Jane Smith',
        age: 45,
        condition: 'Diabetes Management',
        riskLevel: 'Low',
        recoveryTime: '3-5 days',
        successRate: 98,
        recommendations: ['Blood sugar monitoring', 'Dietary counseling', 'Exercise plan']
      },
      {
        id: 3,
        patientName: 'Mike Johnson',
        age: 78,
        condition: 'Hip Replacement',
        riskLevel: 'High',
        recoveryTime: '14-21 days',
        successRate: 85,
        recommendations: ['Physical therapy', 'Pain management', 'Fall prevention']
      }
    ],
    resourceAllocation: {
      beds: {
        icu: { current: 12, predicted: 15, capacity: 20 },
        general: { current: 45, predicted: 52, capacity: 80 },
        emergency: { current: 8, predicted: 12, capacity: 15 }
      },
      staff: {
        nurses: { current: 45, needed: 52, available: 48 },
        doctors: { current: 12, needed: 14, available: 13 },
        technicians: { current: 8, needed: 10, available: 9 }
      },
      equipment: {
        ventilators: { available: 8, predicted: 6, total: 10 },
        monitors: { available: 15, predicted: 12, total: 18 },
        xrayMachines: { available: 3, predicted: 2, total: 4 }
      }
    },
    riskAssessment: {
      readmissionRisk: 12.5,
      infectionRate: 2.3,
      emergencyOverload: 65,
      staffBurnout: 28,
      equipmentFailure: 5.8
    }
  };

  const generatePrediction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPredictions(mockPredictions);
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    generatePrediction();
  }, []);

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUtilizationColor = (percentage) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const PatientOutcomesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictions.patientOutcomes.map((patient) => (
          <div key={patient.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{patient.patientName}</h3>
                <p className="text-sm text-gray-600">Age: {patient.age} | {patient.condition}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.riskLevel)}`}>
                {patient.riskLevel} Risk
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate:</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${patient.successRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{patient.successRate}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Recovery Time:</span>
                <span className="text-sm font-medium">{patient.recoveryTime}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">AI Recommendations:</h4>
              <ul className="space-y-1">
                {patient.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-center">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ResourceAllocationTab = () => (
    <div className="space-y-6">
      {/* Bed Management */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Bed className="w-5 h-5 mr-2 text-blue-600" />
          Bed Allocation Forecast
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(predictions.resourceAllocation.beds).map(([type, data]) => (
            <div key={type} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-700 capitalize mb-2">{type} Beds</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current:</span>
                  <span className="font-medium">{data.current}/{data.capacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Predicted:</span>
                  <span className="font-medium text-blue-600">{data.predicted}/{data.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getUtilizationColor((data.predicted / data.capacity) * 100)}`}
                    style={{ width: `${(data.predicted / data.capacity) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">
                  {Math.round((data.predicted / data.capacity) * 100)}% utilization predicted
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Management */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-green-600" />
          Staff Requirement Forecast
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(predictions.resourceAllocation.staff).map(([role, data]) => (
            <div key={role} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-700 capitalize mb-2">{role}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current:</span>
                  <span className="font-medium">{data.current}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Needed:</span>
                  <span className="font-medium text-orange-600">{data.needed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Available:</span>
                  <span className="font-medium text-green-600">{data.available}</span>
                </div>
                {data.needed > data.available && (
                  <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                    ⚠️ Shortage of {data.needed - data.available} {role}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Management */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-purple-600" />
          Equipment Utilization Forecast
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(predictions.resourceAllocation.equipment).map(([equipment, data]) => (
            <div key={equipment} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-700 capitalize mb-2">
                {equipment.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Available:</span>
                  <span className="font-medium">{data.available}/{data.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>In Use (Predicted):</span>
                  <span className="font-medium text-blue-600">{data.predicted}/{data.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getUtilizationColor((data.predicted / data.total) * 100)}`}
                    style={{ width: `${(data.predicted / data.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const RiskAssessmentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Readmission Risk</h3>
            <Heart className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600 mb-2">
            {predictions.riskAssessment.readmissionRisk}%
          </div>
          <p className="text-sm text-gray-600">
            Predicted 30-day readmission rate based on current patient profiles
          </p>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-xs text-red-700">
              Recommendation: Enhance discharge planning protocols
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Infection Rate</h3>
            <Shield className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {predictions.riskAssessment.infectionRate}%
          </div>
          <p className="text-sm text-gray-600">
            Hospital-acquired infection rate prediction
          </p>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-700">
              Recommendation: Increase sanitation frequency in high-risk areas
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Emergency Overload</h3>
            <AlertTriangle className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {predictions.riskAssessment.emergencyOverload}%
          </div>
          <p className="text-sm text-gray-600">
            Emergency department capacity utilization forecast
          </p>
          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <p className="text-xs text-orange-700">
              Recommendation: Prepare additional emergency staff
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Staff Burnout Risk</h3>
            <Users className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {predictions.riskAssessment.staffBurnout}%
          </div>
          <p className="text-sm text-gray-600">
            Staff burnout probability based on workload analysis
          </p>
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-xs text-purple-700">
              Recommendation: Implement staff wellness programs
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Equipment Failure</h3>
            <Zap className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {predictions.riskAssessment.equipmentFailure}%
          </div>
          <p className="text-sm text-gray-600">
            Critical equipment failure probability this month
          </p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              Recommendation: Schedule preventive maintenance
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">AI Prediction Dashboard</h1>
                <p className="text-gray-600">Advanced healthcare analytics and forecasting</p>
              </div>
            </div>
            <button 
              onClick={generatePrediction}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Refresh Predictions
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-1 mb-6">
          <div className="flex space-x-1">
            {[
              { id: 'patient-outcomes', label: 'Patient Outcomes', icon: UserCheck },
              { id: 'resource-allocation', label: 'Resource Allocation', icon: BarChart3 },
              { id: 'risk-assessment', label: 'Risk Assessment', icon: AlertTriangle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-opacity duration-300">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">AI is analyzing hospital data and generating predictions...</p>
            </div>
          ) : (
            <>
              {activeTab === 'patient-outcomes' && <PatientOutcomesTab />}
              {activeTab === 'resource-allocation' && <ResourceAllocationTab />}
              {activeTab === 'risk-assessment' && <RiskAssessmentTab />}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              AI Confidence: 94.2%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPrediction;