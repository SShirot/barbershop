import apiHelper from '../api/apiHelper';

const brandService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/brands?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/brands', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/brands/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/brands/${id}`);
    },
};

export default brandService;
