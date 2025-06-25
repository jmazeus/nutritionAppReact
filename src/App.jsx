import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import PacienteDashboard from './pages/dashboard/patient/Patient';
import AdminDashboard from './pages/dashboard/admin/AdminClinic';
import AsistenteDashboard from './pages/dashboard/admin/AdminClinic';
import SuperAdmin from './pages/dashboard/SuperAdmin';
import NutriologoDashboard from './pages/dashboard/specialist/Specialist';
import Logout from './features/auth/Logout';
import './styles/dashboard.css';
import './styles/clinic.css';

// Verificar que los componentes estén exportados correctamente
console.log('Componentes importados:', {
  PacienteDashboard,
  AdminDashboard,
  AsistenteDashboard,
  NutriologoDashboard
});

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/paciente" element={<PacienteDashboard />} />
          <Route path="/dashboard/user" element={<PacienteDashboard />} />
          <Route path="/dashboard/asistente" element={<AsistenteDashboard />} />
          <Route path="/dashboard/nutriologo" element={<NutriologoDashboard />} />
          <Route path="/dashboard/superadmin" element={<SuperAdmin />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
