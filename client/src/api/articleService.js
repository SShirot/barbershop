import apiHelper from '../api/apiHelper';

const articleService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/articles?${paramsSearch.toString()}`);
    },
    getListsArticles: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/articles?${paramsSearch.toString()}`);
    },

    add: (petData) => {
        return apiHelper.post('admin/articles', petData);
    },

    update: (id, petData) => {
        return apiHelper.put(`admin/articles/${id}`, petData);
    },

    delete: (id) => {
        return apiHelper.delete(`admin/articles/${id}`);
    },
    addArticle: (petData) => {
        return apiHelper.post('user/articles', petData);
    },

    updateArticle: (id, petData) => {
        return apiHelper.put(`user/articles/${id}`, petData);
    },

    deleteArticle: (id) => {
        return apiHelper.delete(`user/articles/${id}`);
    }
};

export default articleService;
