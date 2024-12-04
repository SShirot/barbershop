import apiHelper from '../api/apiHelper';

const apiSettingInformation = {
    getInfo: (params) => {
        const paramsSearch = new URLSearchParams(params);
        return apiHelper.get(`admin/setting/information`);
    },

    create: (data) => {
        return apiHelper.post('admin/setting/information', data);
    },
};

export default apiSettingInformation;
