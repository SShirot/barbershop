const db = require('../config/dbMysql');

const ProductLabel = {
    tableName: 'ec_product_labels',

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        description: 'varchar(255)',
        slug: 'varchar(255)',
        order: 'tinyint(4) DEFAULT 0',
        status: "enum('published', 'draft', 'pending') DEFAULT 'pending'",
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    // Phương thức lấy tất cả labels với phân trang và tìm kiếm
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${ProductLabel.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${ProductLabel.tableName}`;
        const queryParams = [];

        if (name) {
            query += ' WHERE name LIKE ?';
            countQuery += ' WHERE name LIKE ?';
            queryParams.push(`%${name}%`);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, name ? [`%${name}%`] : []);
        const total = countResult[0].total;

        return {
            data: rows,
            meta: {
                total,
                perPage: pageSize,
                currentPage: page,
                lastPage: Math.ceil(total / pageSize)
            }
        };
    },

    // Phương thức tìm label theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${ProductLabel.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Phương thức tạo mới label
    create: async (labelData) => {
        const query = `INSERT INTO ${ProductLabel.tableName} (name, slug, description, \`order\`, status) VALUES (?, ?, ?, ?, ?)`;
        const values = [
            labelData.name,
            labelData.slug,
            labelData.description || null,
            labelData.order || 0,
            labelData.status || 'pending'
        ];
        const [result] = await db.query(query, values);
        return await ProductLabel.findById(result.insertId);
    },

    // Phương thức cập nhật label theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${ProductLabel.tableName} 
            SET name = ?, slug = ?, description = ?, \`order\` = ?, status = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.description || null,
            updateData.order || 0,
            updateData.status || 'pending',
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await ProductLabel.findById(id) : null;
    },

    // Phương thức xóa label theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${ProductLabel.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = ProductLabel;
