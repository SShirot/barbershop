const HairswapServices = require('../../services/staff/hairswapService');
const { successResponse, errorResponse } = require("../../utils/response");

exports.getList = async (req, res) => {
    try {
        const { page = 1, page_size = 10 } = req.query;
        const result = await HairswapServices.getList(Number(page), Number(page_size));

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get hair styles successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await HairswapServices.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get Lists hair styles successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await HairswapServices.getById(req.params.id);
        if (!data) return errorResponse(res, 'Not found', 404);
        return successResponse(res, { data }, 'Hair style found');
    } catch (err) {
        return errorResponse(res, err.message);
    }
};
exports.getByGender = async (req, res) => {
    try {
        const { gender } = req.params;
        const result = await HairswapServices.getByGender(gender);
        return successResponse(res, { data: result }, 'Hair style found');
    } catch (err) {
        return errorResponse(res, err.message);
    }
}
exports.create = async (req, res) => {
    try {
        const data = req.body;
        const result = await HairswapServices.create(data);
        return successResponse(res, { data: result }, 'Hair style created', 201);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await HairswapServices.update(id, data);
        if (!result) return errorResponse(res, 'Update failed or not found', 404);
        return successResponse(res, { data: result }, 'Hair style updated');
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await HairswapServices.delete(id);
        if (!result) return errorResponse(res, 'Delete failed or not found', 404);
        return successResponse(res, {}, 'Hair style deleted');
    } catch (err) {
        return errorResponse(res, err.message);
    }
};
