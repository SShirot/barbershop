import apiHelper from '../api/apiHelper';

const apiVoteService = {
    add: (data) => {
        return apiHelper.post('user/vote', data);
    },
    getListsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/vote?${paramsSearch.toString()}`);
    },
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/vote?${paramsSearch.toString()}`);
    },
    getListsVoteProducts: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`votes?${paramsSearch.toString()}`);
    },
    delete: (id) => {
        return apiHelper.delete(`admin/vote/${id}`);
    },
};

export default apiVoteService;
