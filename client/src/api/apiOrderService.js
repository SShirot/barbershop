import apiHelper from '../api/apiHelper';

const apiOrderService = {
    add: (data) => {
        return apiHelper.post('order', data);
    },
    getListsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/order?${paramsSearch.toString()}`);
    },
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/order?${paramsSearch.toString()}`);
    },
    deleteOrder: (id) => {
        return apiHelper.delete(`user/order/${id}`);
    },
    updateOrderStatus: (id, data) => {
        return apiHelper.post(`admin/order/update-status/${id}`,data);
    },
};

export default apiOrderService;
