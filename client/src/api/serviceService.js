import apiHelper from '../api/apiHelper';

const serviceService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/services?${paramsSearch.toString()}`);
    },
    getListsRegister: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/services/register?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/services', petData);
    },
    register: (petData) => {
        return apiHelper.post('service/register', petData);
    },
    update: (id, petData) => {
        return apiHelper.put(`admin/services/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/services/${id}`);
    },
    deleteUserService: (id) => {
        return apiHelper.delete(`admin/services/register/${id}`);
    },
    // 🔵 STAFF APIs
    getStaffServices: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`staff/services?${paramsSearch.toString()}`);
    },
    
    addStaffService: (serviceData) => {
        return apiHelper.post('staff/services', serviceData);
    },

    updateStaffService: (id, serviceData) => {
        return apiHelper.put(`staff/services/${id}`, serviceData);
    },
    getServiceByStaffId: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`staff/services/staff?${paramsSearch.toString()}`);
    },
    deleteStaffService: (id) => {
        return apiHelper.delete(`staff/services/${id}`);
    },
    // 🔵 USER APIs
    getServiceUserByUserId: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`service/user?${paramsSearch.toString()}`);
    },
    // Approve service booking
    approveService: (id, staffId = null) => {
        return apiHelper.post(`admin/assigned-services/${id}/approve`, {
            staff_id: staffId
    });
    },

    // Reject service booking
    rejectService: (id) => {
        return apiHelper.post(`admin/assigned-services/${id}/reject`);
    },

    // Complete service booking
    completeService: (id) => {
        return apiHelper.post(`admin/assigned-services/${id}/complete`);
    },
};

export default serviceService;
