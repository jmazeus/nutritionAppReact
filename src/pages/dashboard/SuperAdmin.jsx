import React from 'react';
import Navbar from '../../components/common/Navbar';
import ClinicList from '../../features/clinics/ClinicList';
import useSessionRedirect from '../../hooks/useSessionRedirect';
import '../../styles/dashboard.css';
import '../../styles/table.css';
import '../../styles/navbar.css';

const SuperAdminDashboard = () => {
  useSessionRedirect();

  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="dashboard-content">
        <ClinicList />
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
