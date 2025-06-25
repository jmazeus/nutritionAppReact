// src/pages/dashboard/nutriologo.jsx
import React from 'react';
import Table from '../../../components/ui/Table';
import Navbar from '../../../components/common/Navbar';
import '../../../styles/dashboard.css';
import '../../../styles/table.css';
import '../../../styles/navbar.css';

const DashboardNutriologo = () => {
  // Datos de ejemplo para pacientes
  const pacientes = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      edad: 35,
      peso: '75 kg',
      ultimaConsulta: '2025-06-20',
      proximaConsulta: '2025-06-27'
    },
    {
      id: 2,
      nombre: 'Ana López',
      edad: 42,
      peso: '68 kg',
      ultimaConsulta: '2025-06-18',
      proximaConsulta: '2025-06-25'
    },
    {
      id: 3,
      nombre: 'Pedro Sánchez',
      edad: 28,
      peso: '82 kg',
      ultimaConsulta: '2025-06-15',
      proximaConsulta: '2025-06-22'
    }
  ];

  // Datos de ejemplo para consultas pendientes
  const consultasPendientes = [
    {
      id: 1,
      paciente: 'Ana López',
      fecha: '2025-06-25 10:30',
      tipo: 'Seguimiento',
      estado: 'Pendiente'
    },
    {
      id: 2,
      paciente: 'Pedro Sánchez',
      fecha: '2025-06-22 14:00',
      tipo: 'Seguimiento',
      estado: 'Pendiente'
    }
  ];

  const columnsPacientes = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'edad', label: 'Edad' },
    { key: 'peso', label: 'Peso' },
    { key: 'ultimaConsulta', label: 'Última Consulta' },
    { key: 'proximaConsulta', label: 'Próxima Consulta' }
  ];

  const columnsConsultas = [
    { key: 'id', label: 'ID' },
    { key: 'paciente', label: 'Paciente' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'estado', label: 'Estado' }
  ];

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard de Nutriólogo</h1>
        <div className="dashboard-content">
          <div className="section">
            <h2>Mis Pacientes</h2>
            <Table 
              title=""
              columns={columnsPacientes}
              data={pacientes}
            />
          </div>
          <div className="section">
            <h2>Consultas Pendientes</h2>
            <Table 
              title=""
              columns={columnsConsultas}
              data={consultasPendientes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNutriologo;
