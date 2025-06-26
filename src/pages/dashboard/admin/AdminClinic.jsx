import React from 'react';
import Navbar from '../../../components/common/Navbar';
import ClinicList from '../../../features/clinics/ClinicList';
import '../../../styles/dashboard.css';
import '../../../styles/table.css';
import '../../../styles/navbar.css';
import '../../../styles/clinic.css';
import useSessionRedirect from '../../../hooks/useSessionRedirect';

const AdminClinic = () => {
  useSessionRedirect();

  return (
    <div className="dashboard-container">
      <Navbar />
      <main>
        <ClinicList />
      </main>
    </div>
  );
};

export default AdminClinic;
