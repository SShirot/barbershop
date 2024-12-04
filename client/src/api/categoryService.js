import apiHelper from '../api/apiHelper';

const categoryService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/categories?${paramsSearch.toString()}`);
    },
    getListsGuest: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`categories?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/categories', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/categories/${id}`, petData);
    },

    delete: (id) => {
        console.info("===========[delete] ===========[id] : ",id);
        return apiHelper.delete(`admin/categories/${id}`);
    }
};

export default categoryService;
