import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useSessionRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
      }
    };
    checkSession();
    // Opcional: también puedes escuchar storage para detectar logout en otra pestaña
    const onStorage = (e) => {
      if (e.key === 'token' && !e.newValue) {
        navigate('/');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [navigate]);
}
