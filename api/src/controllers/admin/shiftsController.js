const ShiftsService = require('../../services/admin/shiftsService');
const { successResponse, errorResponse } = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const data = await ShiftsService.getAll();
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ShiftsService.findById(id);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.create = async (req, res) => {
    try {
        const shiftData = req.body;
        const data = await ShiftsService.create(shiftData);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const shiftData = req.body;
        const data = await ShiftsService.update(id, shiftData);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ShiftsService.delete(id);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
}; 