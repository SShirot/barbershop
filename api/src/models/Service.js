const db = require('../config/dbMysql');

const Service = {
    tableName: 'services',

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        slug: 'varchar(255)',
        is_home_service: 'tinyint(1) DEFAULT 0',
        price: 'int(11) DEFAULT 0',
        description: 'text',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    // Phương thức lấy danh sách dịch vụ với phân trang và tìm kiếm
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${Service.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Service.tableName}`;
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
                lastPage: Math.ceil(total / pageSize),
                page_size: pageSize,
                total_page: Math.ceil(total / pageSize),
            }
        };
    },

    // Phương thức lấy dịch vụ theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${Service.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Phương thức tạo mới dịch vụ
    create: async (serviceData) => {
        const query = `
            INSERT INTO ${Service.tableName} 
            (name, slug, is_home_service, price, description) 
            VALUES (?, ?, ?, ?, ?)`;
        const values = [
            serviceData.name,
            serviceData.slug,
            serviceData.is_home_service || 0,
            serviceData.price || 0,
            serviceData.description || null
        ];
        const [result] = await db.query(query, values);
        return await Service.findById(result.insertId);
    },

    // Phương thức cập nhật dịch vụ theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${Service.tableName} 
            SET name = ?, slug = ?, is_home_service = ?, price = ?, description = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.is_home_service || 0,
            updateData.price || 0,
            updateData.description || null,
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await Service.findById(id) : null;
    },

    // Phương thức xóa dịch vụ theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${Service.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Service;
