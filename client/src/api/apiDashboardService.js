import apiHelper from '../api/apiHelper';

const apiDashboardService = {
    getDashboard: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/dashboard?${paramsSearch.toString()}`);
    },
    getFetchMonthlyRevenue: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/dashboard/fetch-monthly-revenue?${paramsSearch.toString()}`);
    },
    getFetchDailyRevenue: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/dashboard/fetch-daily-revenue?${paramsSearch.toString()}`);
    },
    getFetchNewOrder: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/dashboard/fetch-order-news?${paramsSearch.toString()}`);
    },
    getFetchNewUser: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`user/dashboard/fetch-user-news?${paramsSearch.toString()}`);
    },
};

export default apiDashboardService;