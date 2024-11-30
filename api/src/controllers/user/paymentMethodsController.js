const Service = require('../../services/user/paymentMethodsService');
const { successResponse, errorResponse } = require("../../utils/response");

// Get all votes
exports.getAll = async (req, res) => {
    try {
        const { page = 1, page_size: pageSize = 10} = req.query;
        const result = await Service.getAll(Number(page), Number(pageSize), req);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of method successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
