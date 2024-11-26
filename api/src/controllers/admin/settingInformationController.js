const SettingInformation = require('../../models/SettingInformation');
const { successResponse, errorResponse } = require("../../utils/response");

// Get all menus
exports.getInfo = async (req, res) => {
    try {
        const result = await SettingInformation.getInfo();
        console.info("===========[] ===========[result] : ",result);
        return successResponse(res, { data: result }, 'Get Info successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.create = async (req, res) => {
    try {
        const existingInfo = await SettingInformation.getInfo();
        let updatedInfo = null;
        if (existingInfo) {
            // Nếu đã có thông tin, cập nhật
            updatedInfo = await SettingInformation.update(existingInfo.id, req.body);
        } else {
            // Nếu chưa có, tạo mới
            updatedInfo = await SettingInformation.create(req.body);
        }
        return successResponse(res, { data: updatedInfo }, 'Get Info successfully');

    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
