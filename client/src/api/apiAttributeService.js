import apiHelper from '../api/apiHelper';

const apiAttributeService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/attribute?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/attribute', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/attribute/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/attribute/${id}`);
    },
};

export default apiAttributeService;
