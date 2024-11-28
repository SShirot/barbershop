const Service = require('../../models/Service');
const ServiceUser = require('../../models/ServiceUser');
const formatResponse = require("../../utils/response");
const {successResponse, errorResponse} = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const { page =  1, page_size: pageSize = 10, name } = req.query;
        const result = await Service.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.findById = async (req, res) => {
    try {
        const category = await Service.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(formatResponse('success', { category }, 'Get category successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.registerService = async (req, res) => {
    try {
        // Lưu thông tin đăng ký dịch vụ vào cơ sở dữ liệu
        const result = await ServiceUser.create(req.body);

        if (!result) {
            return errorResponse(res, 'Failed to register service');
        }

        return successResponse(res, { data: result }, 'Service registered successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, 'Error occurred while registering service');
    }
};

