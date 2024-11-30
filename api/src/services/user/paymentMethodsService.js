const Repository = require('./../../repositories/paymentMethodsRepository');

const PaymentMethodsService = {
    getAll: async (page, pageSize, req) => {
        const offset = (page - 1) * pageSize;
        const { data, total } = await Repository.getAll(offset, pageSize, req);
        return {
            data,
            meta: {
                total,
                perPage: pageSize,
                currentPage: page,
                lastPage: Math.ceil(total / pageSize)
            }
        };
    }
};

module.exports = PaymentMethodsService;
