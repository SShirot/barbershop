import apiHelper from '../api/apiHelper';

const apiProductService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`products?${paramsSearch.toString()}`);
    },
    getListsLabel: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`products/label?${paramsSearch.toString()}`);
    },
    showProductDetail: (id) => {
        return apiHelper.get(`products/show/${id}`);
    },
    showDashboardVoteDetail: (id) => {
        return apiHelper.get(`products/vote-dashboard/${id}`);
    },
};

export default apiProductService;
