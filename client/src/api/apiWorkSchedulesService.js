import apiHelper from '../api/apiHelper';

const apiWorkSchedulesService = {
    getAll: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/work-schedules?${paramsSearch.toString()}`);
    },
};

export default apiWorkSchedulesService;
