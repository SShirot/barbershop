import apiHelper from '../api/apiHelper';

const userService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/users?${paramsSearch.toString()}`);
    },
    getListsAdmin: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`users?user_type=ADMIN&${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/users', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/users/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/users/${id}`);
    },
    getProfile: (id) => {
        return apiHelper.get(`me`);
    },
    updateProfile: (data) => {
        return apiHelper.put(`me`,data);
    },
    forgotPassword: (data) => {
        return apiHelper.post(`auth/forgot-password`,data);
    },
    resetPassword: (data) => {
        return apiHelper.post(`auth/reset-password`,data);
    },
    verifyAccount: (token) => {
        return apiHelper.post(`auth/verify/${token}`);
    },
};

export default userService;
