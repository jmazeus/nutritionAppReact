import { fetchWithAuth } from './fetchWithAuth';

const API_URL = 'http://localhost:8080/api/clinics';

export const clinicsApi = {
    getAll: async () => {
        try {
            const response = await fetchWithAuth(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching clinics:', error);
            throw error;
        }
    },

    create: async (clinicData) => {
        try {
            const response = await fetchWithAuth(API_URL, {
                method: 'POST',
                body: JSON.stringify(clinicData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating clinic:', error);
            throw error;
        }
    },

    update: async (id, clinicData) => {
        try {
            const response = await fetchWithAuth(`${API_URL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(clinicData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating clinic:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await fetchWithAuth(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting clinic:', error);
            throw error;
        }
    }
};
