const db = require('../config/dbMysql');

const PaymentMethodsRepository = {
    tableName: 'payment_methods',
    getAll: async (offset = 0, pageSize = 10, req) => {
        let query = `SELECT * FROM ${PaymentMethodsRepository.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${PaymentMethodsRepository.tableName}`;
        const queryParams = [];

        if (req.name) {
            query += ' WHERE name LIKE ?';
            countQuery += ' WHERE name LIKE ?';
            queryParams.push(`%${req.name}%`);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, req.name ? [`%${req.name}%`] : []);
        const total = countResult[0].total;

        return { data: rows, total };
    }
};

module.exports = PaymentMethodsRepository;
