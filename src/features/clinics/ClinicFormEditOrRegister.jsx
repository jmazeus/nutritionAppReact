import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './ClinicFormEditOrRegister.css';
import BouncingLoader from '../../components/ui/BouncingLoader';

export default function ClinicFormEditOrRegister({ mode = 'register', initialData = {}, onSubmit, onClose, onError }) {
  // mode: 'register' | 'edit'
  // initialData: { name, address, telephone, email, url, id }
  // onSubmit: function to handle success
  // onClose: function to close modal/dialog

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: initialData.name || '',
    address: initialData.address || '',
    telephone: initialData.telephone || '',
    email: initialData.email || '',
    url: initialData.url || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Permisos básicos (opcional, puedes quitar si no usas roles aquí)
    const checkPermissions = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const decoded = jwtDecode(token);
        const role = decoded.role || decoded.authorities?.[0];
        const hasPermission = role === 'SUPER_ADMIN' || role === 'CLINIC_ADMIN';
        if (!hasPermission) navigate('/');
      } catch {
        navigate('/login');
      }
    };
    checkPermissions();
  }, [navigate]);

  useEffect(() => {
    // Solo actualiza el formulario si cambia el id (edición) o si es registro
    setForm({
      name: initialData.name || '',
      address: initialData.address || '',
      telephone: initialData.telephone || '',
      email: initialData.email || '',
      url: initialData.url || ''
    });
    // eslint-disable-next-line
  }, [initialData.id, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre de la clínica es requerido';
    if (!form.address.trim()) newErrors.address = 'La dirección es requerida';
    if (!form.telephone.trim()) newErrors.telephone = 'El número de teléfono es requerido';
    // Validar url si no está vacía y no empieza con http:// o https://
    if (form.url && form.url.trim() && !/^https?:\/\//i.test(form.url.trim())) {
      newErrors.url = 'La URL debe comenzar con http:// o https://';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Mostrar loader inmediatamente
    setLoading(true);
    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    try {
      if (!validateForm()) throw new Error('Hay campos requeridos sin completar');
      await wait(1200); // Loader visible antes de la petición
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token de autenticación');
      const isEdit = mode === 'edit' && (initialData?.clinicId || initialData?.id);
      const baseUrl = 'http://localhost:8080';
      // Usar clinicId para el endpoint si existe, si no fallback a id
      const clinicIdentifier = initialData.clinicId || initialData.id;
      const endpoint = isEdit ? `/api/clinics/${clinicIdentifier}` : '/api/clinics';
      const urlClinic = `${baseUrl}${endpoint}`;
      const methodRest = isEdit ? 'PUT' : 'POST';
      // Construir el payload para edición (PUT) con todos los campos requeridos
      let payload;
      if (isEdit) {
        payload = {
          clinicId: initialData.clinicId,
          id: initialData.id, // por compatibilidad, si el backend lo requiere
          name: form.name,
          address: form.address,
          telephone: form.telephone,
          email: form.email,
          url: form.url,
          createdBy: initialData.createdBy,
          createdByName: initialData.createdByName,
          createdAt: initialData.createdAt
        };
      } else {
        payload = {
          name: form.name,
          address: form.address,
          telephone: form.telephone,
          email: form.email,
          url: form.url
        };
      }
      const response = await fetch(urlClinic, {
        method: methodRest,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (typeof onError === 'function') onError(errorData.message || response.statusText);
        throw new Error(errorData.message || response.statusText);
      }
      const data = await response.json();
      if (onSubmit) onSubmit(data);
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar la clínica. Por favor, inténtalo de nuevo.');
      if (typeof onError === 'function') onError(err.message || 'Error al guardar la clínica. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="clinic-form" onSubmit={handleSubmit}>
      <h2 className="clinic-form-title">
        {mode === 'edit' ? 'Editar Clínica' : 'Registrar Clínica'}
      </h2>
      <p className="clinic-form-desc">
        {mode === 'edit'
          ? 'Modifica la información de la clínica.'
          : 'Por favor proporciona la información para registrar una nueva clínica.'}
      </p>
      <div className="clinic-form-group">
        <label htmlFor="name">Nombre de la Clínica</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="clinic-form-group">
        <label htmlFor="telephone">Teléfono</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={form.telephone}
          onChange={handleChange}
          required
        />
        {errors.telephone && <div className="invalid-feedback">{errors.telephone}</div>}
      </div>
      <div className="clinic-form-group">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="clinic-form-group">
        <label htmlFor="url">Sitio web</label>
        <input
          type="url"
          id="url"
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://ejemplo.com"
        />
        {errors.url && <div className="invalid-feedback">{errors.url}</div>}
      </div>
      <div className="clinic-form-group">
        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {loading ? (
        <div className="loader-centered-modal">
          <BouncingLoader />
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, alignItems: 'center', minHeight: 60 }}>
          <button type="submit" className="add-clinic-btn" disabled={loading}>
            {mode === 'edit' ? 'Guardar Cambios' : 'Registrar Clínica'}
          </button>
          {onClose && (
            <button type="button" className="add-clinic-btn" style={{ background: '#aaa' }} onClick={onClose} disabled={loading}>
              Cancelar
            </button>
          )}
        </div>
      )}
    </form>
  );
}
