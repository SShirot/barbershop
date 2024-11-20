import apiHelper from '../api/apiHelper';

const appointmentService = {
    getAppointments: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`appointments?${paramsSearch.toString()}`);
    },

    getAppointmentsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/appointments?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('appointments', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`appointments/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`appointments/${id}`);
    },
    confirmAppointment : (id) => {
        return apiHelper.put(`admin/appointments/${id}/confirm`);
    },
    cancelAppointment : (id) => {
        return apiHelper.put(`admin/appointments/${id}/cancel`);
    },
    completeAppointment : (id) => {
        return apiHelper.put(`admin/appointments/${id}/complete`);
    },
    pendingAppointment : (id) => {
        return apiHelper.put(`admin/appointments/${id}/pending`);
    }
};

export default appointmentService;
