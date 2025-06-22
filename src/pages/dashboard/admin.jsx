      import React from 'react';
import Table from '../../components/Table';
import '../../styles/table.css';
import Navbar from '../../components/Navbar';
import '../../styles/navbar.css';

const DashboardAdmin = () => {
  const nutriologos = [
    {
      id: 1,
      nombre: 'María García',
      especialidad: 'Nutrición Clínica',
      pacientes: 25,
      citas: 50,
      email: 'maria.garcia@clinic.com'
    },
    {
      id: 2,
      nombre: 'Carlos Rodríguez',
      especialidad: 'Nutrición Deportiva',
      pacientes: 18,
      citas: 35,
      email: 'carlos.rodriguez@clinic.com'
    },
    {
      id: 3,
      nombre: 'Ana Sánchez',
      especialidad: 'Nutrición Infantil',
      pacientes: 22,
      citas: 45,
      email: 'ana.sanchez@clinic.com'
    }
  ];

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
    { key: 'especialidad', label: 'Especialidad' },
    { key: 'pacientes', label: 'Pacientes' },
    { key: 'citas', label: 'Citas Totales' },
    { key: 'email', label: 'Email' }
  ];

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard de Administrador</h1>
        <div className="dashboard-content">
          <Table 
            title="Nutriólogos en el Sistema"
            columns={columns}
            data={nutriologos}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
