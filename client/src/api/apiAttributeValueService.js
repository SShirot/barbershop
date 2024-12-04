import apiHelper from '../api/apiHelper';

const apiAttributeService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/attribute-values?${paramsSearch.toString()}`);
    },
};

export default apiAttributeService;
