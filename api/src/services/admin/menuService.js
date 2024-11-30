const MenuRepository = require('./../../repositories/MenuRepository');

const MenuService = {
    getAll: async (page, pageSize, name) => {
        const offset = (page - 1) * pageSize;
        const { data, total } = await MenuRepository.getAll(offset, pageSize, name);
        return {
            data,
            meta: {
                total,
                perPage: pageSize,
                currentPage: page,
                lastPage: Math.ceil(total / pageSize)
            }
        };
    },

    findById: async (id) => {
        return await MenuRepository.findById(id);
    },

    create: async (menuData) => {
        const newMenuId = await MenuRepository.create(menuData);
        return await MenuRepository.findById(newMenuId);
    },

    update: async (id, updateData) => {
        const isUpdated = await MenuRepository.updateById(id, updateData);
        return isUpdated ? await MenuRepository.findById(id) : null;
    },

    delete: async (id) => {
        return await MenuRepository.deleteById(id);
    }
};

module.exports = MenuService;
