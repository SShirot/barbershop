const Repository = require('./../../repositories/WorkPreferencesRepository');

const WorkPreferencesService = {

    getAll: async (params = {}) => {
        console.log("=========== params: ", params);        
        return await Repository.getAll(params);
    },
    findByUserId: async (userID) => {
        return await Repository.findByUserId(userID);
    },

    createOrUpdate: async (userID, data) => {
        return await Repository.updateOrCreate(userID, data);
    },
};

module.exports = WorkPreferencesService;
