import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PacienteDashboard from './pages/dashboard/patient';
import AdminDashboard from './pages/dashboard/admin';
import AsistenteDashboard from './pages/dashboard/assistant';
import UserDashboard from './pages/dashboard/user';
import NutriologoDashboard from './pages/dashboard/nutriologo';
import './styles/dashboard.css';

// Verificar que los componentes estén exportados correctamente
console.log('Componentes importados:', {
  PacienteDashboard,
  AdminDashboard,
  AsistenteDashboard,
  UserDashboard,
  NutriologoDashboard
});

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/paciente" element={<PacienteDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/asistente" element={<AsistenteDashboard />} />
          <Route path="/dashboard/nutriologo" element={<NutriologoDashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
