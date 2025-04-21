import apiHelper from './apiHelper';

const calendarService = {
    getStaffCalendar: async (staffId, viewType, date) => {
        try {
            const response = await apiHelper.get(`/admin/calendar/staff/${staffId}`, {
                params: {
                    view_type: viewType,
                    date: date
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching staff calendar:', error);
            throw error;
        }
    },

    getStaffAvailableSlots: async (staffId, date) => {
        try {
            const response = await apiHelper.get(`/admin/calendar/staff/${staffId}/available-slots`, {
                params: { date }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching available slots:', error);
            throw error;
        }
    },

    getEventDetails: async (eventId) => {
        try {
            const response = await apiHelper.get(`/admin/calendar/event/${eventId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching event details:', error);
            throw error;
        }
    }
};

export default calendarService; 