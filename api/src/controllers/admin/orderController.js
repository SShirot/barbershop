const Model = require('../../models/Order');
const { successResponse, errorResponse } = require("../../utils/response");
// const Model = require("../../models/Product");

// Lấy tất cả đơn hàng
exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await Model.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of data successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Lấy đơn hàng theo ID
exports.getById = async (req, res) => {
    try {
        const order = await Model.findById(req.params.id)
            .populate('user', 'name')
            .populate({
                path: 'transactions',
                populate: { path: 'product', select: 'name price' }
            });

        if (!order) {
            return errorResponse(res, 'Order not found', 404);
        }

        return successResponse(res, { data: order }, 'Order found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, 'Server error');
    }
};

// Tạo mới đơn hàng
exports.create = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await Model.create(orderData);

        return successResponse(res, { data: newOrder }, 'Order created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res, 'Server error');
    }
};

// Cập nhật trạng thái đơn hàng
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Kiểm tra trạng thái hợp lệ
        const validStatuses = ['pending', 'completed', 'processing', 'canceled'];
        if (!validStatuses.includes(status)) {
            return errorResponse(res, 'Invalid status', 400);
        }

        const order = await Model.findById(req.params.id);
        if (!order) {
            return errorResponse(res, 'Order not found', 404);
        }

        // Cập nhật trạng thái
        order.status = status;
        await order.save();

        return successResponse(res, { data: order }, 'Order status updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, 'Server error');
    }
};

// Xóa đơn hàng
exports.delete = async (req, res) => {
    try {
        const order = await Model.findById(req.params.id);
        if (!order) {
            return errorResponse(res, 'Order not found', 404);
        }

        // Xóa các giao dịch liên quan
        // await Transaction.deleteMany({ order: req.params.id });
        // await Model.findByIdAndDelete(req.params.id);

        return successResponse(res, {}, 'Order deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, 'Server error');
    }
};
