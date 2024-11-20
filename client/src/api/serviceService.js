import apiHelper from '../api/apiHelper';

const serviceService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/services?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/services', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/services/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/services/${id}`);
    },
};

export default serviceService;
