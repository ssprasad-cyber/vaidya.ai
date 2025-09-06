import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import Dashboard from './pages/doctor/DoctorsDashboard';
import HospitalAuth from './pages/patient/HospitalAuth';
import DoctorAuth from './pages/doctor/DoctorAuth';
import HospitalDashboard from './pages/admin/HospitalDashboard';
import AdminAuth from './pages/admin/AdminAuth';
import GetStarted from './pages/GetStarted';
import AIPredictions from './pages/AI/AIPredictions';
import AIPredictionPage from './pages/AI/AIPredictionPage';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/doctor/auth" element={<DoctorAuth />} />
        <Route path="/patient/auth" element={<HospitalAuth />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/predictions/manual" element={<AIPredictionPage />} />

        {/* Protected Routes */}
        <Route
          path="/patient/dashboard"
          element={
            <PrivateRoute allowedRoles={['patient']}>
              <PatientDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <PrivateRoute allowedRoles={['doctor']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <HospitalDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/predictions"
          element={
            <PrivateRoute allowedRoles={['patient']}>
              <AIPredictions />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
// This code sets up the main application structure using React Router.