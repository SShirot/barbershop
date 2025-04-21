import apiHelper from './apiHelper';

const workScheduleService = {
    getAll: async (params = {}) => {
        try {
            const response = await apiHelper.get('/admin/work-schedule', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching work schedules:', error);
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const response = await apiHelper.get(`/admin/work-schedule/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching work schedule:', error);
            throw error;
        }
    },

    create: async (data) => {
        try {
            const response = await apiHelper.post('/admin/work-schedule', data);
            return response.data;
        } catch (error) {
            console.error('Error creating work schedule:', error);
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const response = await apiHelper.put(`/admin/work-schedule/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating work schedule:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await apiHelper.delete(`/admin/work-schedule/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting work schedule:', error);
            throw error;
        }
    },

    getStaffSchedule: async (staffId, date) => {
        try {
            const response = await apiHelper.get('/admin/work-schedule/staff', {
                params: {
                    staff_id: staffId,
                    date: date
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching staff schedule:', error);
            throw error;
        }
    },

    getAvailableStaff: async (date, shiftId) => {
        try {
            const response = await apiHelper.get('/admin/work-schedule/available-staff', {
                params: {
                    date: date,
                    shift_id: shiftId
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching available staff:', error);
            throw error;
        }
    }
};

export default workScheduleService;