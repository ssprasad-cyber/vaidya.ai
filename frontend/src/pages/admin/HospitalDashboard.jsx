import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Bed, 
  UserCheck, 
  FileText, 
  DollarSign, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  Activity,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'doctors', label: 'Doctors', icon: UserCheck },
    { id: 'rooms', label: 'Rooms & Beds', icon: Bed },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const stats = [
    { label: 'Total Patients', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Today\'s Appointments', value: '87', change: '+5%', icon: Calendar, color: 'bg-green-500' },
    { label: 'Available Beds', value: '156', change: '-3%', icon: Bed, color: 'bg-yellow-500' },
    { label: 'Revenue (Month)', value: '$89,432', change: '+18%', icon: DollarSign, color: 'bg-purple-500' },
  ];

  const recentPatients = [
    { id: 1, name: 'John Smith', age: 45, condition: 'Hypertension', doctor: 'Dr. Wilson', status: 'Stable' },
    { id: 2, name: 'Sarah Johnson', age: 32, condition: 'Diabetes', doctor: 'Dr. Brown', status: 'Critical' },
    { id: 3, name: 'Mike Davis', age: 28, condition: 'Fracture', doctor: 'Dr. Lee', status: 'Recovering' },
    { id: 4, name: 'Emma Wilson', age: 55, condition: 'Cardiac', doctor: 'Dr. Smith', status: 'Stable' },
  ];

  const upcomingAppointments = [
    { time: '09:00 AM', patient: 'Alice Brown', doctor: 'Dr. Wilson', type: 'Consultation' },
    { time: '10:30 AM', patient: 'Bob Johnson', doctor: 'Dr. Lee', type: 'Follow-up' },
    { time: '02:15 PM', patient: 'Carol Davis', doctor: 'Dr. Smith', type: 'Surgery' },
    { time: '04:00 PM', patient: 'David Miller', doctor: 'Dr. Brown', type: 'Check-up' },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-600">{patient.condition} • {patient.doctor}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  patient.status === 'Critical' ? 'bg-red-100 text-red-800' :
                  patient.status === 'Stable' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <p className="text-sm text-gray-600">{appointment.patient} • {appointment.doctor}</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {appointment.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bed Occupancy */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bed Occupancy</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ICU</span>
              <span className="text-sm font-medium">12/15</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">General Ward</span>
              <span className="text-sm font-medium">45/60</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Private Rooms</span>
              <span className="text-sm font-medium">8/20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        {/* Staff Status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff on Duty</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Doctors</span>
              <span className="text-lg font-bold text-green-600">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Nurses</span>
              <span className="text-lg font-bold text-blue-600">56</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Support Staff</span>
              <span className="text-lg font-bold text-purple-600">18</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">Critical Patient</p>
                <p className="text-xs text-red-600">Room 204 needs immediate attention</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Equipment Maintenance</p>
                <p className="text-xs text-yellow-600">MRI machine scheduled for service</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Staff Meeting</p>
                <p className="text-xs text-blue-600">Department heads meeting at 3 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'patients':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Management</h2>
            <p className="text-gray-600">Manage patient records, admissions, and medical history.</p>
          </div>
        );
      case 'appointments':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Scheduling</h2>
            <p className="text-gray-600">Schedule and manage patient appointments with doctors.</p>
          </div>
        );
      case 'doctors':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Management</h2>
            <p className="text-gray-600">Manage doctor profiles, schedules, and specializations.</p>
          </div>
        );
      case 'rooms':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Room & Bed Management</h2>
            <p className="text-gray-600">Monitor room availability and bed assignments.</p>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
            <p className="text-gray-600">Generate reports and view hospital analytics.</p>
          </div>
        );
      case 'billing':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Billing Management</h2>
            <p className="text-gray-600">Handle patient billing, insurance, and payments.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
            <p className="text-gray-600">Configure system settings and user permissions.</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className={`font-bold text-xl text-gray-800 ${!sidebarOpen && 'hidden'}`}>
            HospitalAdmin
          </h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        <nav className="mt-8">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                activeTab === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">AD</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;