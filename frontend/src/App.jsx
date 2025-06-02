import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientDashboard from  './pages/patient/PatientDashboard';
import Dashboard from  './pages/doctor/DoctorsDashboard';
import HospitalAuth from './pages/patient/HospitalAuth';
import DoctorAuth from './pages/doctor/DoctorAuth';
import HospitalDashboard from './pages/admin/HospitalDashboard';
import AdminAuth from './pages/admin/AdminAuth';
import GetStarted from './pages/GetStarted';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes here as you build more pages */}

        <Route path="/dlogin" element={<DoctorAuth />} />
        <Route path="/Plogin" element={<HospitalAuth />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/admin" element={<HospitalDashboard />} />
        <Route path="/Auth" element={<AdminAuth />} />
        <Route path="/doc" element={<Dashboard />} />
        <Route path="/getstarted" element={<GetStarted />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;