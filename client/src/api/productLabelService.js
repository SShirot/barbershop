import apiHelper from '../api/apiHelper';

const productLabelService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/product-labels?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/product-labels', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/product-labels/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/product-labels/${id}`);
    },
};

export default productLabelService;
