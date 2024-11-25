import apiHelper from '../api/apiHelper';

const apiVoteService = {
    add: (data) => {
        return apiHelper.post('user/vote', data);
    },
    createOrder: (data) => {
        return apiHelper.post(`admin/vote`,data);
    },
    updateOrder: (id, data) => {
        return apiHelper.put(`admin/vote/${id}`,data);
    },
    getListsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/vote?${paramsSearch.toString()}`);
    },
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/vote?${paramsSearch.toString()}`);
    },
    delete: (id) => {
        return apiHelper.delete(`admin/vote/${id}`);
    },
};

export default apiVoteService;
