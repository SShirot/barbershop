import apiHelper from '../api/apiHelper';

const apiBrandService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`brand?${paramsSearch.toString()}`);
    },
};

export default apiBrandService;
