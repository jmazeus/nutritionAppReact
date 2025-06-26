import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ClinicForm = ({ clinic = null, onClose, onSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: clinic?.name || '',
        address: clinic?.address || '',
        telephone: clinic?.telephone || ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const checkPermissions = () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const decoded = jwtDecode(token);
                
                const role = decoded.role || decoded.authorities[0];
                const hasPermission = role === 'SUPER_ADMIN' || role === 'CLINIC_ADMIN';

                if (!hasPermission) {
                    navigate('/');
                }
            } catch (error) {
                console.log('Error decoding token:', error);                
                navigate('/login');
            }
        };

        checkPermissions();
    }, [navigate]);

    useEffect(() => {
        if (clinic) {
            setFormData({
                name: clinic.name,
                address: clinic.address,
                telephone: clinic.telephone
            });
        }
    }, [clinic]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre de la clínica es requerido';
        }
        
        if (!formData.address.trim()) {
            newErrors.address = 'La dirección es requerida';
        }
        
        if (!formData.telephone.trim()) {
            newErrors.telephone = 'El número de teléfono es requerido';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!validateForm()) {
                throw new Error('Hay campos requeridos sin completar');
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay token de autenticación');
            }

            const isEdit = !!clinic?.id;
            console.log('isEdit: ', isEdit);
            const baseUrl = 'http://localhost:8080';
            const endpoint = isEdit ? `/api/clinics/${clinic.id}` : '/api/clinics';
            const urlClinic = `${baseUrl}${endpoint}`;
            console.log('urlClinic: ', urlClinic);
            const methodRest = isEdit ? 'PUT' : 'POST';
            console.log('methodRest: ', methodRest);
            
            try {
                const response = await fetch(urlClinic, {
                    method: methodRest,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        address: formData.address,
                        telephone: formData.telephone
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || response.statusText);
                }

                const data = await response.json();
                console.log('Clinica creada/editada:', data);
                
                // Llamar a onClose para cerrar el formulario
                onClose();
                
                // Si hay una función onSuccess, llamarla con los datos de la clínica
                if (onSuccess) {
                    onSuccess(data);
                }
                
                return data; // Aseguramos que el try/catch funcione correctamente
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        } catch (error) {
            setError(error.message || 'Error al guardar la clínica. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="clinic-form-container">
            <h2>{clinic ? 'Editar Clínica' : 'Agregar Nueva Clínica'}</h2>
            <form onSubmit={handleSubmit} className="clinic-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre de la Clínica *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Dirección *</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        rows="3"
                        required
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="telephone">Teléfono *</label>
                    <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className={`form-control ${errors.telephone ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
                </div>

                {error && <div className="alert alert-danger mt-3">{error}</div>}

                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Guardando...' : (clinic ? 'Actualizar' : 'Crear')}
                    </button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={onClose} disabled={loading}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClinicForm;
