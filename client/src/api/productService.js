import apiHelper from '../api/apiHelper';

const productService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/products?${paramsSearch.toString()}`);
    },

    getListsProducts: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/products?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/products', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/products/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/products/${id}`);
    },
    addProduct: (petData) => {
        return apiHelper.post('user/products', petData);
    },

    updateProduct: (id, petData) => {
        return apiHelper.put(`user/products/${id}`, petData);
    },

    deleteProduct: (id) => {
        return apiHelper.delete(`user/products/${id}`);
    }
};

export default productService;
