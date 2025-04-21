import apiHelper from './apiHelper';

const shiftService = {
    getAll: async (params = {}) => {
        try {
            const response = await apiHelper.get('/admin/shifts', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching shifts:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await apiHelper.get(`/admin/shifts/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching shift:', error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const response = await apiHelper.post('/admin/shifts', data);
            return response.data;
        } catch (error) {
            console.error('Error creating shift:', error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const response = await apiHelper.put(`/admin/shifts/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating shift:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await apiHelper.delete(`/admin/shifts/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting shift:', error);
            throw error;
        }
    },

    getByDate: async (date) => {
        try {
            const response = await apiHelper.get('/admin/shifts/date', {
                params: { date }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching shifts by date:', error);
            throw error;
        }
    },

    getAvailableShifts: async (date) => {
        try {
            const response = await apiHelper.get('/admin/shifts/available', {
                params: { date }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching available shifts:', error);
            throw error;
        }
    }
};

export default shiftService; 