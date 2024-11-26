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
