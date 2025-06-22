      import React from 'react';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar';
import '../../styles/dashboard.css';
import '../../styles/table.css';
import '../../styles/navbar.css';

const DashboardPatient = () => {
  // Datos de ejemplo para la próxima cita
  const nextAppointment = {
    id: 1,
    nutriologo: 'María García',
    date: '2025-06-23 15:30',
    status: 'confirmed',
    notes: 'Seguimiento de dieta'
  };

  // Convertir el objeto a array para la tabla
  const appointmentData = [nextAppointment];

  const columns = [
    { key: 'nutriologo', label: 'Nutriólogo' },
    { key: 'date', label: 'Fecha' },
    { key: 'status', label: 'Estado' },
    { key: 'notes', label: 'Notas' }
  ];

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard de Paciente</h1>
        <div className="dashboard-content">
          <div className="section">
            <h2>Próxima Cita</h2>
            <Table 
              title=""
              columns={columns}
              data={appointmentData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPatient;
