import apiHelper from '../api/apiHelper';

const dashboardService = {
    getDashboard: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard?${paramsSearch.toString()}`);
    },
    getFetchMonthlyRevenue: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-monthly-revenue?${paramsSearch.toString()}`);
    },
    getFetchDailyRevenue: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-daily-revenue?${paramsSearch.toString()}`);
    },
    getFetchNewOrder: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-order-news?${paramsSearch.toString()}`);
    },
    getFetchNewUser: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/dashboard/fetch-user-news?${paramsSearch.toString()}`);
    },
};

export default dashboardService;
