import apiHelper from '../api/apiHelper';

const apiWorkPreferencesService = {
    findByUser: () => {
        return apiHelper.get(`admin/work-preferences`);
    },

    createOrUpdate: (data) => {
        return apiHelper.post('admin/work-preferences', data);
    },
};

export default apiWorkPreferencesService;
