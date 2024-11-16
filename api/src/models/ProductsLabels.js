const db = require('../config/dbMysql');
const ProductsLabels = {
    tableName: 'ec_products_labels',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        product_id: 'bigint(20) UNSIGNED NOT NULL',
        product_label_id: 'bigint(20) UNSIGNED NOT NULL'
    },
    assignLabel: async (productId, labelIds) => {
        // Xóa các tags hiện có của bài viết
        console.info("===========[] ===========[productId] : ",productId);
        await db.query(`DELETE FROM ${ProductsLabels.tableName} WHERE product_id = ?`, [productId]);

        // Thêm các tags mới vào bảng trung gian
        const values = labelIds.map(product_label_id => [productId, product_label_id]);
        if (values.length > 0) {
            const query = `INSERT INTO ${ProductsLabels.tableName} (product_id, product_label_id) VALUES ?`;
            await db.query(query, [values]);
        }
    }
};

module.exports = ProductsLabels;
