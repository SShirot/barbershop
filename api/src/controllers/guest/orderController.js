const Model = require("../../models/Order");
const {successResponse, errorResponse} = require("../../utils/response");
const OrderService = require('../../services/user/orderService');

exports.createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await Model.create(orderData);

        return successResponse(res, { data: newOrder }, 'Order created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res, 'Server error');
    }
};

exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, code } = req.query;
        const userId = req.user.id;
        const result = await Model.getAll(Number(page), Number(pageSize), code,userId);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of data successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.updateStatusPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id, payment_status, user_id = userId } = req.body;
        const result = await OrderService.updateStatusPayment(id, {
            payment_status,
            user_id
        });

        return successResponse(res, { data: result.data }, 'Update successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
