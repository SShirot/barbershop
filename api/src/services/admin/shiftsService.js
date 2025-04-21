const Repository = require('../../repositories/shiftsRepository');

const ShiftsService = {
    getAll: async () => {
        return await Repository.getAll();
    },

    findById: async (id) => {
        return await Repository.findById(id);
    },

    create: async (shiftData) => {
        return await Repository.create(shiftData);
    },

    update: async (id, shiftData) => {
        return await Repository.update(id, shiftData);
    },

    delete: async (id) => {
        return await Repository.delete(id);
    }
};

module.exports = ShiftsService; 