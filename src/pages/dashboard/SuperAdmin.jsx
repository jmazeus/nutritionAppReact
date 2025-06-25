import React from 'react';
import Navbar from '../../components/common/Navbar';
import ClinicList from '../../features/clinics/ClinicList';
import '../../styles/dashboard.css';
import '../../styles/table.css';
import '../../styles/navbar.css';

const SuperAdminDashboard = () => {
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
