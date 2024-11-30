const AttributeService = require('./../../services/admin/attributeService');
const { successResponse, errorResponse } = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const { page : page = 1, page_size: pageSize = 10 } = req.query;
        const result = await AttributeService.getAllAttributeValue(Number(page), Number(pageSize), req.query);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get Lists menu successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
