const orderService = require('../../services/orderService');
const formatResponse = require('../../utils/response');

exports.createOrder = async (req, res) => {
    try {
        const { transactions, ...orderData } = req.body;

        if (!req.user) {
            // Nếu người dùng không đăng nhập, yêu cầu thông tin khách
            if (!orderData.guestInfo || !orderData.guestInfo.name || !orderData.guestInfo.email || !orderData.guestInfo.phone) {
                return res.status(400).json(formatResponse('error', [], 'Guest information is required'));
            }
        } else {
            orderData.user = req.user.id; // Nếu người dùng đã đăng nhập, lưu ID người dùng
        }

        const { order, transactions: createdTransactions } = await orderService.createOrder(orderData, transactions);

        res.status(201).json(formatResponse('success', { order, transactions: createdTransactions }, 'Order created successfully'));
    } catch (err) {
        res.status(500).json(formatResponse('error', [], 'Server error'));
    }
};
