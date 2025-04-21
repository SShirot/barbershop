import apiHelper from './apiHelper';

const assignedServicesService = {
    getUnassignedServices: async () => {
        try {
            const response = await apiHelper.get('/admin/assigned-services/unassigned');
            return response.data;
        } catch (error) {
            console.error('Error fetching unassigned services:', error);
            throw error;
        }
    },

    getStaffSchedule: async (staffId, date) => {
        try {
            const response = await apiHelper.get('/admin/assigned-services/staff-schedule', {
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

    getStaffAvailableSlots: async (staffId, date) => {
        try {
            const response = await apiHelper.get('/admin/assigned-services/staff-available-slots', {
                params: {
                    staff_id: staffId,
                    date: date
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching staff available slots:', error);
            throw error;
        }
    },

    assignService: async (serviceId, staffId, scheduleId, note = null) => {
        try {
            const response = await apiHelper.post('/admin/assigned-services/assign', {
                service_id: serviceId,
                staff_id: staffId,
                schedule_id: scheduleId,
                note: note
            });
            return response.data;
        } catch (error) {
            console.error('Error assigning service:', error);
            throw error;
        }
    }
};

export default assignedServicesService; 