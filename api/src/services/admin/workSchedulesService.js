const Repository = require('./../../repositories/WorkSchedulesRepository');

const WorkSchedulesService = {

    getAll: async (params = {}) => {   
        return await Repository.getAll(params);
    }
};

module.exports = WorkSchedulesService;
