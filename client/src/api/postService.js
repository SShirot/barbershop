import apiHelper from '../api/apiHelper';

const postService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/posts?${paramsSearch.toString()}`);
    },
    getListsMenus: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/menus?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('user/posts', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`user/posts/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`user/posts/${id}`);
    },
    uploadPostImage: (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        return apiHelper.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default postService;
