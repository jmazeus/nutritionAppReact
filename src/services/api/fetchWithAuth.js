// fetchWithAuth.js
// Helper para fetch que maneja 401 globalmente

export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...(options.headers || {}),
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
  const opts = { ...options, headers };
  const response = await fetch(url, opts);
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirige al login
    return Promise.reject(new Error('Sesión expirada. Redirigiendo al login.'));
  }
  return response;
}
