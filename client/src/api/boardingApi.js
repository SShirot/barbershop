import apiHelper from '../api/apiHelper';

const boardingApi = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/boarding?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('user/boarding', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`user/boarding/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`user/boarding/${id}`);
    },
    checkUserRating: (type, itemId) => {
        return apiHelper.get(`user/rating/check`,{ params: { type, itemId } });
    },
    rateItem: (data) => {
        return apiHelper.post(`user/rating/rate`,data);
    },
    // Lấy đánh giá trung bình của một item (dịch vụ hoặc sản phẩm)
    getItemRating: (type, itemId) => {
        return apiHelper.get(`user/rating/item-rating`, {
            params: { type, itemId },
        });
    },
};

export default boardingApi;
