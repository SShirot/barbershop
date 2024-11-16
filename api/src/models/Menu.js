const db = require('../config/dbMysql');

const Menu = {
    tableName: 'bl_menus',

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

    // Phương thức lấy danh sách menu với phân trang và tìm kiếm
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${Menu.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Menu.tableName}`;
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
                page: page,
                lastPage: Math.ceil(total / pageSize),
                page_size: pageSize,
                total_page: Math.ceil(total / pageSize),
            }
        };
    },

    // Phương thức lấy menu theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${Menu.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Phương thức tạo mới menu
    create: async (menuData) => {
        const query = `INSERT INTO ${Menu.tableName} (name, slug, description, status, is_featured) VALUES (?, ?, ?, ?, ?)`;
        const values = [
            menuData.name,
            menuData.slug,
            menuData.description || null,
            menuData.status || 'pending',
            menuData.is_featured || 0
        ];
        const [result] = await db.query(query, values);
        return await Menu.findById(result.insertId);
    },

    // Phương thức cập nhật menu theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${Menu.tableName} 
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
        return result.affectedRows > 0 ? await Menu.findById(id) : null;
    },

    // Phương thức xóa menu theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${Menu.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Menu;
