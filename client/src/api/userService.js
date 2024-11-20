import apiHelper from '../api/apiHelper';

const userService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/users?${paramsSearch.toString()}`);
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
};

export default userService;
