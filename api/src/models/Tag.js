const db = require('../config/dbMysql'); // Đảm bảo bạn đã thiết lập kết nối DB ở file này

const Tag = {
    tableName: 'bl_tags',

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        slug: 'varchar(255)',
        description: 'varchar(255)',
        status: "enum('published', 'draft', 'pending') DEFAULT 'pending'",
        is_featured: 'tinyint(4) DEFAULT 0',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    // Phương thức lấy danh sách tag với phân trang và tìm kiếm
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${Tag.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Tag.tableName}`;
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
                page_size: pageSize,
                currentPage: page,
                page: page,
                lastPage: Math.ceil(total / pageSize),
                total_page: Math.ceil(total / pageSize),
            }
        };
    },

    // Phương thức lấy tag theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${Tag.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Phương thức tạo mới tag
    create: async (tagData) => {
        const query = `INSERT INTO ${Tag.tableName} (name, slug, description, status, is_featured) VALUES (?, ?, ?, ?, ?)`;
        const values = [
            tagData.name,
            tagData.slug,
            tagData.description || null,
            tagData.status || 'pending',
            tagData.is_featured || 0
        ];
        const [result] = await db.query(query, values);
        return await Tag.findById(result.insertId);
    },

    // Phương thức cập nhật tag theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${Tag.tableName} 
            SET name = ?, slug = ?, description = ?, status = ?, is_featured = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.description || null,
            updateData.status || 'pending',
            updateData.is_featured || 0,
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await Tag.findById(id) : null;
    },

    // Phương thức xóa tag theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${Tag.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Tag;
