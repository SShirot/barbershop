const AttributeRepository = require('./../../repositories/AttributeRepository');
const AttributeValueRepository = require('./../../repositories/attributeValueRepository');

const AttributeService = {
    getAll: async (page, pageSize, name) => {
        const offset = (page - 1) * pageSize;
        const { data, total } = await AttributeRepository.getAll(offset, pageSize, name);
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
    getAllAttributeValue: async (page, pageSize, req) => {
        const offset = (page - 1) * pageSize;
        const { data, total } = await AttributeValueRepository.getAll(offset, pageSize, req);
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
        return await AttributeRepository.findById(id);
    },

    create: async (menuData) => {
        const newMenuId = await AttributeRepository.createWithValues(menuData);
        // const newMenuId = await AttributeRepository.create(menuData);
        return await AttributeRepository.findById(newMenuId);
    },

    update: async (id, updateData) => {
        const isUpdated = await AttributeRepository.updateWithValues(id, updateData);
        // const isUpdated = await AttributeRepository.updateById(id, updateData);
        return isUpdated ? await AttributeRepository.findById(id) : null;
    },

    delete: async (id) => {
        return await AttributeRepository.deleteById(id);
    }
};

module.exports = AttributeService;
