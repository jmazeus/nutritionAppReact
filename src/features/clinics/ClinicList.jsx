import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ClinicForm from './ClinicForm';
import Table from '../../components/ui/Table';

const ClinicList = () => {
    const navigate = useNavigate();
    const [clinics, setClinics] = useState({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 1,
        last: true
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [showForm, setShowForm] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);

    // Función para cargar clínicas
    const fetchClinics = async (page = 0, size = 10) => {
        console.log('Iniciando fetchClinics');
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (!token) {
                console.error('No hay token de autenticación');
                throw new Error('No hay token de autenticación');
            }

            // Verificar si el token es válido
            try {
                const decoded = jwtDecode(token);
                console.log('Token decodificado:', decoded);
            } catch (decodeError) {
                console.error('Error al decodificar el token:', decodeError);
                throw new Error('Token inválido');
            }

            console.log('Haciendo request a /api/clinics');
            const response = await fetch(`http://localhost:8080/api/clinics?page=${page}&size=${size}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                console.error('Error details:', data);
                throw new Error(`HTTP error! status: ${response.status}. Details: ${data.message || 'No details available'}`);
            }

            setClinics(data);
            console.log('Clínicas actualizadas en estado:', data);
            return data;
        } catch (error) {
            console.error('Error en fetchClinics:', {
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    };

    // Verificar autorizaciones y cargar clínicas al cargar el componente
    useEffect(() => {
        const checkAuthorizationAndLoadData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirigir al login si no hay token
                navigate('/');
                return false;
            }

            try {
                const decoded = jwtDecode(token);
                const role = decoded.role || decoded.authorities[0];
                
                // Verificar si tiene rol de SUPER_ADMIN o CLINIC_ADMIN
                const hasPermission = role === 'SUPER_ADMIN' || role === 'CLINIC_ADMIN';

                if (!hasPermission) {
                    // Redirigir a la página correspondiente según el rol
                    if (role === 'NUTRIOLOGO') {
                        navigate('/dashboard/nutriologo');
                    } else if (role === 'ASISTENTE') {
                        navigate('/dashboard/assistant');
                    } else if (role === 'PACIENTE') {
                        navigate('/dashboard/paciente');
                    } else {
                        navigate('/');
                    }
                    return false;
                }

                // Cargar las clínicas iniciales
                await fetchClinics();
                return true;
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                navigate('/');
                return false;
            }
        };

        checkAuthorizationAndLoadData();
    }, [navigate]);

    // Cargar clínicas cuando cambian currentPage o pageSize
    useEffect(() => {
        fetchClinics(currentPage, pageSize);
    }, [currentPage, pageSize]);





    const handleAddClinic = () => {
        setShowForm(true);
        setSelectedClinic(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedClinic(null);
    };

    const handleEdit = async (id) => {
        try {
            const clinic = clinics.find(c => c.id === id);
            if (!clinic) return;
            setSelectedClinic(clinic);
            setShowForm(true);
        } catch (error) {
            console.error('Error al editar clínica:', error);
            alert('Error al editar la clínica. Por favor, inténtalo de nuevo.');
        }
    };

    const handleDelete = async (id) => {
        console.log('Iniciando eliminación de clínica con ID:', id);
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta clínica?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            console.log('Haciendo DELETE a /api/clinics/', id);
            const response = await fetch(`http://localhost:8080/api/clinics/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Clínica eliminada exitosamente');
            alert('Clínica eliminada exitosamente');
            // Refrescar la lista
            await fetchClinics(currentPage, pageSize);
        } catch (error) {
            console.error('Error en handleDelete:', {
                error: error.message,
                stack: error.stack
            });
            alert('Error al eliminar la clínica. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="clinic-container">
            <div className="clinic-header">
                <h1>Clínicas</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setShowForm(true);
                        setSelectedClinic(null);
                    }}
                >
                    Agregar Clínica
                </button>
            </div>
            <div className="clinic-content">
                <Table
                    columns={[
                        { key: 'name', label: 'Nombre' },
                        { key: 'address', label: 'Dirección' },
                        { key: 'telephone', label: 'Teléfono' },
                        { key: 'clinicId', label: 'ID Clínica' },
                        { key: 'createdAt', label: 'Fecha de Creación' }
                    ]}
                    data={clinics.content}
                    title="Lista de Clínicas"
                />
            </div>
            {showForm && (
                <ClinicForm
                    clinic={selectedClinic}
                    onClose={() => {
                        setShowForm(false);
                        setSelectedClinic(null);
                    }}
                    onSuccess={(newClinic) => {
                        // Actualizar la lista de clínicas
                        setClinics(prev => ({
                            ...prev,
                            content: [...prev.content, newClinic]
                        }));
                        setShowForm(false);
                        setSelectedClinic(null);
                    }}
                />
            )}
        </div>
    );
};

export default ClinicList;
