const Service = require('../../models/Service');

exports.getAllServices = async (page, pageSize, searchQuery, type) => {
    const query = {};

    if (searchQuery) {
        query.name = { $regex: searchQuery, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
    }

    if (type) {
        query.type = type;
    }

    const total = await Service.countDocuments(query);
    const services = await Service.find(query)
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    return {
        services,
        meta: {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        }
    };
};
