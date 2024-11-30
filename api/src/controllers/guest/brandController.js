const Brand = require('../../models/Brand');
const {successResponse, errorResponse} = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const { page =  1, page_size: pageSize = 10, name, page_site = null, product_id } = req.query;
        const result = await Brand.getAll(Number(page), Number(pageSize), product_id, page_site);

        return successResponse(res, { meta: result.meta, data: result.data });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

