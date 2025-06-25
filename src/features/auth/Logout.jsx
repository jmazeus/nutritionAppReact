import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    // Limpiar el token y redirigir al login
    localStorage.removeItem('token');
    navigate('/');

    return null;
};

export default Logout;
