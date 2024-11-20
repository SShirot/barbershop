const Order = require('../../models/Order');
const Transaction = require('../../models/Transaction');
const formatResponse = require("../../utils/response");

exports.getAllOrder = async (req, res) => {
    try {
        const params = req.query;
        const query = {};
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.page_size) || 10;

        if (params.customerName) {
            query['guestInfo.name'] = { $regex: params.customerName, $options: 'i' }; // Tìm kiếm không phân biệt hoa thường
        }
        if (params.status) {
            query.status = params.status;
        }

        const total = await Order.countDocuments(query);
        const orders = await Order.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate({
                path: 'user',
                select: 'name'
            }) // Populate user information if any
            .populate({
                path: 'transactions',
                populate: { path: 'product', select: 'name price' }
            });

        const meta = {
            total,
            total_page: Math.ceil(total / pageSize),
            page,
            page_size: pageSize
        };
        res.json(formatResponse('success', { orders, meta }, 'Get list of orders successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};


// Xóa bài viết
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Post not found' });

        // Xóa tất cả các giao dịch liên quan đến đơn hàng
        await Transaction.deleteMany({ order: req.params.id });
        await Order.findByIdAndDelete(req.params.id);
        res.json(formatResponse('success', [], 'Post deleted successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Kiểm tra nếu trạng thái là hợp lệ
        const validStatuses = ['pending', 'completed', 'canceled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Cập nhật trạng thái đơn hàng
        order.status = status;
        await order.save();

        res.json(formatResponse('success', order, 'Order status updated successfully'));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

