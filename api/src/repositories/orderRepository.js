const db = require('../config/dbMysql');

const OrderRepository = {
    tableName: 'ec_orders',
    tableTransaction: 'ec_transactions',
    updateStatus: async (id, updateData) => {
        const query = `
            UPDATE ${AttributeRepository.tableName} 
            SET name = ?, slug = ?, status = ?, updated_at = NOW()
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.status || 'pending',
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0;
    },
    updateStatusPayment: async (id, updateData) => {
        const query = `
            UPDATE ${OrderRepository.tableName} 
            SET payment_status = ?, updated_at = NOW()
            WHERE id = ? and user_id = ?`;
        const values = [
            updateData.payment_status,
            id,
            updateData.user_id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0;
    },
    // Phương thức lấy đơn hàng theo ID
    findById: async (id) => {
        const query = `
            SELECT o.*, u.name AS user_name, u.email AS user_email
            FROM ${OrderRepository.tableName} o
            LEFT JOIN users u ON o.user_id = u.id
            WHERE o.id = ? LIMIT 1
        `;
        const [rows] = await db.query(query, [id]);
        const order = rows.length > 0 ? rows[0] : null;

        if (order) {
            const productsQuery = `
                SELECT p.id, p.name, p.price, op.qty 
                FROM ec_transactions op
                JOIN ec_products p ON op.product_id = p.id
                WHERE op.order_id = ?
            `;
            const [products] = await db.query(productsQuery, [id]);
            order.products = products;
        }

        return order;
    },
};

module.exports = OrderRepository;
