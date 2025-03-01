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

    deleteStaffService: (id) => {
        return apiHelper.delete(`staff/services/${id}`);
    },
};

export default serviceService;
