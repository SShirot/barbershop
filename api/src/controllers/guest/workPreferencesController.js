const WorkPreferencesService = require('./../../services/admin/WorkPreferencesService');
const { successResponse, errorResponse } = require("../../utils/response");

exports.findByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const data = await WorkPreferencesService.findByUserId(userId);
        return successResponse(res, { data: data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getAll = async (req, res) => {
    try {
        const data = await WorkPreferencesService.getAll(req.query);
        return successResponse(res, { data: data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};


exports.createOrUpdate = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        // Cập nhật menu
        const data = await WorkPreferencesService.createOrUpdate(userId, updateData);


        return successResponse(res, { data: data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

