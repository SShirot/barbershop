const Repository = require('./../../repositories/orderRepository');

const OrderService = {
    updateStatus: async (id, updateData) => {
        const isUpdated = await Repository.updateStatus(id, updateData);
        // return isUpdated ? await Repository.findById(id) : null;
        return null;
    },
    updateStatusPayment: async (id, updateData) => {
        const isUpdated = await Repository.updateStatusPayment(id, updateData);
        return isUpdated ? await Repository.findById(id) : null;
    }
};

module.exports = OrderService;
