import React from 'react';
import Table from '../../components/Table';
import '../../styles/table.css';
import Navbar from '../../components/Navbar';
import '../../styles/navbar.css';

const DashboardAssistant = () => {
  const appointments = [
    {
      id: 1,
      patient: 'Juan Pérez',
      nutriologo: 'María García',
      date: '2025-06-22 10:00',
      status: 'confirmed',
      notes: 'Primera consulta'
    },
    {
      id: 2,
      patient: 'Ana López',
      nutriologo: 'Carlos Rodríguez',
      date: '2025-06-23 15:30',
      status: 'pending',
      notes: 'Seguimiento'
    },
    {
      id: 3,
      patient: 'Pedro Sánchez',
      nutriologo: 'María García',
      date: '2025-06-24 11:00',
      status: 'confirmed',
      notes: 'Seguimiento'
    }
  ];

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'patient', label: 'Paciente' },
    { key: 'nutriologo', label: 'Nutriólogo' },
    { key: 'date', label: 'Fecha' },
    { key: 'status', label: 'Estado' },
    { key: 'notes', label: 'Notas' }
  ];

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard de Asistente</h1>
        <div className="dashboard-content">
          <Table 
            title="Citas Programadas"
            columns={columns}
            data={appointments}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardAssistant;
