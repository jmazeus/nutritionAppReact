import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al login
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h2 className="navbar-title">Clinic Nutri</h2>
        <div className="navbar-actions">
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
