import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import {jwtDecode} from 'jwt-decode';

const USER_ROLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    PACIENTE: 'PACIENTE',
    ESPECIALISTA: 'ESPECIALISTA',
    ASISTENTE: 'ASISTENTE',
    CLINIC_ADMIN: 'CLINIC_ADMIN'
};

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            console.log('Datos a enviar:', formData);
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const data = await res.json();
                // Guardar el token en localStorage
                localStorage.setItem('token', data.token);
                const decoded = jwtDecode(data.token);
                console.log('Decoded token:', decoded);
                const role = decoded.role || decoded.authorities[0];
                console.log('Login successful:', data);
                console.log('Token stored:', data.token);
                console.log('Role:', role);
                console.log('Role:', role);
                if (role === USER_ROLES.SUPER_ADMIN || role === USER_ROLES.CLINIC_ADMIN) {
                    navigate('/dashboard/superadmin');
                } else if (role === USER_ROLES.ESPECIALISTA) {
                    console.log('Estoy en nutriologo: ', USER_ROLES.ESPECIALISTA);
                    navigate('/dashboard/nutriologo');
                } else if (role === USER_ROLES.ASISTENTE) {
                    navigate('/dashboard/assistant');
                } else if (role === USER_ROLES.PACIENTE) {
                    navigate('/dashboard/paciente');
                } else {
                    navigate('/dashboard/user');
                }
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Ocurrió un error en la conexión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="container">
                <div className="heading">Entrar</div>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="input"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {error && <div className="error-message">{error}</div>}
                    <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
                    <input className="login-button" type="submit" value={loading ? 'Cargando...' : 'Sign In'} disabled={loading} />
                </form>
                <div className="social-account-container">
                    <span className="title">Or Sign in with</span>
                    <div className="social-accounts">
                        <button className="social-button google">G</button>
                        <button className="social-button apple">A</button>
                        <button className="social-button twitter">T</button>
                    </div>
                </div>
                <span className="agreement"><a href="#">Learn user licence agreement</a></span>
            </div>
        </div>
    );
}; export default Login;