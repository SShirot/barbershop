const Model = require('../../models/Order');
const { successResponse, errorResponse } = require("../../utils/response");
const Article = require("../../models/Post");
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

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const orderData = req.body;
        const newOrder = await Model.updateById(id, orderData);

        return successResponse(res, { data: newOrder }, 'Order update successfully', 201);
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

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const isDeleted = await Model.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Data not found', 404, 404);
        }

        return successResponse(res, {}, 'Data deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
//
//
// // Xóa đơn hàng
// exports.delete = async (req, res) => {
//     try {
//         // Tìm đơn hàng theo ID
//         const order = await Model.findById(req.params.id);
//         if (!order) {
//             return errorResponse(res, 'Order not found', 404);
//         }
//
//         // Xóa các bản ghi trong `ec_transactions` dựa vào `order_id`
//         const deleteTransactionsQuery = `DELETE FROM ec_transactions WHERE order_id = ?`;
//         await db.query(deleteTransactionsQuery, [req.params.id]);
//
//         // Xóa đơn hàng trong `ec_orders`
//         const deleteOrderQuery = `DELETE FROM ${Model.tableName} WHERE id = ?`;
//         const [result] = await db.query(deleteOrderQuery, [req.params.id]);
//
//         if (result.affectedRows > 0) {
//             return successResponse(res, {}, 'Order deleted successfully');
//         } else {
//             return errorResponse(res, 'Failed to delete order', 500);
//         }
//     } catch (err) {
//         console.error('Error deleting order and transactions:', err);
//         return errorResponse(res, 'Server error');
//     }
// };
