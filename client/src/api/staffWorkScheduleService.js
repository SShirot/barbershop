import apiHelper from './apiHelper';

const staffWorkScheduleService = {
    // Lấy lịch làm việc của staff
    getStaffSchedule: async (viewType, date) => {
        try {
            console.log('1. Fetching staff schedule...');
            console.log('View Type:', viewType);
            console.log('Date:', date);

            const response = await apiHelper.get('/staff/work-schedule/schedule', {
                params: {
                    view_type: viewType,
                    date: date
                }
            });

            console.log('2. Raw API response:', response);

            if (!response || !response.data) {
                throw new Error('Invalid response structure');
            }

            console.log('3. Schedule data found:', response.data);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching staff schedule:', error);
            throw error;
        }
    },

    // Đăng ký ca làm việc
    registerSchedule: async (workDate, shiftId) => {
        try {
            const response = await apiHelper.post('/staff/work-schedule/register', {
                work_date: workDate,
                shift_id: shiftId
            });
            return response.data;
        } catch (error) {
            console.error('Error registering schedule:', error);
            throw error;
        }
    },

    // Lấy danh sách ca làm việc còn trống
    getAvailableShifts: async (date) => {
        try {
            const response = await apiHelper.get('/staff/work-schedule/available-shifts', {
                params: { date }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching available shifts:', error);
            throw error;
        }
    },

    // Lấy chi tiết một ca làm việc
    getScheduleDetails: async (scheduleId) => {
        try {
            const response = await apiHelper.get(`/staff/work-schedule/schedule/${scheduleId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching schedule details:', error);
            throw error;
        }
    },

    // Hủy đăng ký ca làm việc
    cancelSchedule: async (scheduleId) => {
        try {
            const response = await apiHelper.delete(`/staff/work-schedule/schedule/${scheduleId}`);
            return response.data;
        } catch (error) {
            console.error('Error cancelling schedule:', error);
            throw error;
        }
    }
};

export default staffWorkScheduleService; 