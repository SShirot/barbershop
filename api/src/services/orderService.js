const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

exports.createOrder = async (orderData, transactionsData) => {
    // Tạo đơn hàng tổng
    const order = new Order(orderData);
    await order.save();

    // Tạo các giao dịch chi tiết
    const transactions = await Promise.all(
        transactionsData.map(async (transaction) => {
            const newTransaction = new Transaction({
                order: order._id,
                product: transaction.product,
                quantity: transaction.quantity,
                price: transaction.price
            });
            await newTransaction.save();
            return newTransaction;
        })
    );

    // Lưu danh sách các transactions vào order
    order.transactions = transactions.map(t => t._id);
    await order.save();

    return { order, transactions };
};

