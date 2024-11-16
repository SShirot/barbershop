import apiHelper from '../api/apiHelper';

const apiCustomerService = {
    getLists: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/users?${paramsSearch.toString()}`);
    }
};

export default apiCustomerService;
