const HairswapRepository = require('../../repositories/hairswapRepository');

const HairswapServices = {
    create: async (data) => {
        const newId = await HairswapRepository.create(data);
        return await HairswapRepository.getById(newId);
    },

    update: async (id, data) => {
        const isUpdated = await HairswapRepository.updateById(id,data);
        return isUpdated ? await HairswapRepository.getById(id) : null;
    },

    delete: async (id) => {
        return await HairswapRepository.deleteById(id); 
    },

    getAll: async (page, pageSize, name) => {
        const offset = (page - 1) * pageSize;
        const { data, total } = await HairswapRepository.getAll(offset, pageSize, name);
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

    getById: async (id) => {
        return await HairswapRepository.getById(id);
    },
    
    getByGender: async (gender) => {
        return await HairswapRepository.getByGender(gender);
    },

    getByGenderAndId: async (gender,id) => {
        return await HairswapRepository.getByGenderAndId(gender,id);
    },
    
    getPagedList: async (page = 1, pageSize = 10) => {
        const [rows, total] = await Promise.all([
            HairswapRepository.getPaged(page, pageSize),
            HairswapRepository.getTotalCount()
        ]);

        const totalPage = Math.ceil(total / pageSize);

        return {
            sampleImages: rows,
            meta: {
                total,
                page,
                page_size: pageSize,
                total_page: totalPage
            }
        };
    }
}

module.exports = HairswapServices;
