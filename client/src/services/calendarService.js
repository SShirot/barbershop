import apiHelper from '../api/apiHelper';

const calendarService = {
    // Work Schedule APIs
    getWorkSchedules: async (params = {}) => {
        try {
            const response = await apiHelper.get('/admin/work-schedule', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getStaffList: async () => {
        try {
            console.log('=== Frontend getStaffList Start ===');
            console.log('1. Making API request to /admin/work-schedule/staff-list');
            const response = await apiHelper.get('/admin/work-schedule/staff-list');
            console.log('2. Raw API response:', response);

            // Check if response has the correct structure
            if (!response || !response.data) {
                console.error('3. Invalid response structure:', response);
                throw new Error('Invalid response structure from server');
            }

            // Get the staff array from response.data
            const staffList = response.data.data || [];
            console.log('4. Extracted staff list:', staffList);
            console.log('5. Number of staff found:', staffList.length);
            
            console.log('=== Frontend getStaffList End ===');
            return staffList;
        } catch (error) {
            console.error('Error in getStaffList:', {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            });
            throw error.response?.data || error.message;
        }
    },

    getWorkScheduleById: async (id) => {
        try {
            const response = await apiHelper.get(`/admin/work-schedule/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createWorkSchedule: async (data) => {
        try {
            const response = await apiHelper.post('/admin/work-schedule', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateWorkSchedule: async (id, data) => {
        try {
            const response = await apiHelper.put(`/admin/work-schedule/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteWorkSchedule: async (id) => {
        try {
            const response = await apiHelper.delete(`/admin/work-schedule/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAvailableStaff: async (work_date, shift_id) => {
        try {
            const response = await apiHelper.get('/admin/work-schedule/available-staff', {
                params: { work_date, shift_id }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Shifts APIs
    getShifts: async () => {
        try {
            const response = await apiHelper.get('/admin/shifts');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getShiftById: async (id) => {
        try {
            const response = await apiHelper.get(`/admin/shifts/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createShift: async (data) => {
        try {
            const response = await apiHelper.post('/admin/shifts', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateShift: async (id, data) => {
        try {
            const response = await apiHelper.put(`/admin/shifts/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteShift: async (id) => {
        try {
            const response = await apiHelper.delete(`/admin/shifts/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Assigned Services APIs
    getAssignedServices: async (params = {}) => {
        try {
            const response = await apiHelper.get('/admin/assigned-services', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getAssignedServiceById: async (id) => {
        try {
            const response = await apiHelper.get(`/admin/assigned-services/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    createAssignedService: async (data) => {
        try {
            const response = await apiHelper.post('/admin/assigned-services', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateAssignedService: async (id, data) => {
        try {
            const response = await apiHelper.put(`/admin/assigned-services/${id}`, data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteAssignedService: async (id) => {
        try {
            const response = await apiHelper.delete(`/admin/assigned-services/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Service User APIs
    getUnassignedServices: async () => {
        try {
            const response = await apiHelper.get('/admin/assigned-services/unassigned');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getStaffSchedule: async (staffId, startDate, endDate) => {
        try {
            console.log('1. Fetching staff schedule...');
            console.log('Staff ID:', staffId);
            console.log('Date Range:', startDate, 'to', endDate);

            const response = await apiHelper.get(`/admin/work-schedule`, {
                params: {
                    staff_id: staffId,
                    start_date: startDate,
                    end_date: endDate
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

    getStaffAvailableSlots: async (staffId, date) => {
        try {
            const response = await apiHelper.get('/admin/assigned-services/staff-available-slots', {
                params: { staff_id: staffId, date }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    assignService: async (serviceData) => {
        try {
            const response = await apiHelper.post('/admin/assigned-services/assign', serviceData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Staff Schedule Management APIs
    getStaffRequests: async () => {
        try {
            console.log('Sending request to get staff requests with params:', { status: 'pending' });
            const response = await apiHelper.get('/admin/work-schedule', { 
                params: { status: 'pending' }
            });
            console.log('Staff requests API response:', response);
            return response.data;
        } catch (error) {
            console.error('Error in getStaffRequests:', error);
            throw error.response?.data || error.message;
        }
    },

    approveRequest: async (requestId) => {
        try {
            console.log('=== API Call - Approve Request ===');
            console.log('1. Service - Preparing approve request for ID:', requestId);
            console.log('2. Service - Endpoint:', `/admin/work-schedule/${requestId}/approve`);
            
            const response = await apiHelper.post(`/admin/work-schedule/${requestId}/approve`);
            console.log('3. Service - API Response:', {
                status: response.status,
                data: response.data,
                headers: response.headers
            });
            
            return response.data;
        } catch (error) {
            console.error('4. Service - API Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: error.config
            });
            throw error.response?.data || error.message;
        }
    },

    rejectRequest: async (requestId) => {
        try {
            console.log('Sending reject request for ID:', requestId);
            const response = await apiHelper.post(`/admin/work-schedule/${requestId}/reject`);
            console.log('Reject request API response:', response);
            return response.data;
        } catch (error) {
            console.error('Error in rejectRequest:', error);
            throw error.response?.data || error.message;
        }
    }
};

export default calendarService; 