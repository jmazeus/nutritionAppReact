import React, { useState, useEffect } from 'react';
import Table from '../../components/ui/Table';
import ClinicFormEditOrRegister from './ClinicFormEditOrRegister';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ClinicList = () => {
    const [clinics, setClinics] = useState({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 1,
        last: true
    });
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState('');
    const [editClinic, setEditClinic] = useState(null);

    // Cargar clínicas al montar
    const fetchClinics = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/clinics?page=0&size=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setClinics(data);
        } catch (error) {
            console.log('Error al cargar clínicas:', error);
            
            setClinics({ ...clinics, content: [] });
        }
    };

    useEffect(() => {
        fetchClinics();
        // eslint-disable-next-line
    }, []);

    // Columnas extendidas
    const columns = [
        { key: 'name', label: 'Nombre', format: (value) => value || '-' },
        { key: 'address', label: 'Dirección', format: (value) => value || '-' },
        { key: 'telephone', label: 'Teléfono', format: (value) => value || '-' },
        { key: 'email', label: 'Correo Electrónico', format: (value) => value || '-' },
        { key: 'url', label: 'Sitio Web', format: (value) => value ? <a href={value} target="_blank" rel="noopener noreferrer">{value}</a> : '-' },
        { key: 'clinicId', label: 'ID Clínica', format: (value) => value || '-' },
        {
            key: 'createdAt',
            label: 'Fecha de Creación',
            format: (value) => value ? new Date(value).toLocaleString('es-MX') : '-'
        }
    ];

    const handleAddClinic = () => {
        setFormError('');
        setEditClinic(null);
        setShowForm(true);
    };
    const handleEditClinic = (clinic) => {
        setFormError('');
        setEditClinic(clinic);
        setShowForm(true);
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditClinic(null);
    };
    const handleSuccess = () => {
        setShowForm(false);
        setEditClinic(null);
        fetchClinics();
    };
    const handleFormError = (msg) => {
        setFormError(msg);
        alert(msg);
    };

    // Acciones por fila
    const actions = (row) => [
      <button
        className="table-action"
        title="Editar"
        style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgb(16, 137, 211)'}}
        onClick={() => handleEditClinic(row)}
      >
        <FontAwesomeIcon icon={faPencil} style={{ color: 'rgb(16, 137, 211)' }} />
      </button>,
      <button className="table-action" title="Eliminar" style={{background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgb(16, 137, 211)'}}>
        <FontAwesomeIcon icon={faTrash} style={{ color: 'rgb(16, 137, 211)' }} />
      </button>
    ];

    return (
        <div className="clinic-container">
          <div className="data-table">
            <div className="table-header-row">
              <h1 style={{ color: 'rgb(16, 137, 211)', fontSize: '1.5rem', fontWeight: 600, margin: 0, letterSpacing: '0.01em', fontFamily: 'Segoe UI, Roboto, Arial, sans-serif' }}>Clínicas</h1>
              <button className="add-clinic-btn" onClick={handleAddClinic} title="Agregar Clínica">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <Table
              columns={columns}
              data={clinics.content}
              title="Lista de Clínicas"
              actions={actions}
            />
            {showForm && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <ClinicFormEditOrRegister
                    mode={editClinic ? "edit" : "register"}
                    initialData={editClinic || {}}
                    onSubmit={handleSuccess}
                    onClose={handleCloseForm}
                    onError={handleFormError}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
    );
};

export default ClinicList;