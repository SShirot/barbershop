import apiHelper from '../api/apiHelper';

const slideService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/slides?${paramsSearch.toString()}`);
    },
    getListsGuest: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`slides?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/slides', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/slides/${id}`, petData);
    },

    delete: (id) => {
        console.info("===========[delete] ===========[id] : ",id);
        return apiHelper.delete(`admin/slides/${id}`);
    }
};

export default slideService;
