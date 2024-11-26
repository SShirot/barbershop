// models/ServiceUser.js
const db = require('../config/dbMysql');

const ServiceUser = {
    tableName: 'services_user',
    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        user_id: 'int(11) NOT NULL',                    // ID người dùng, bắt buộc
        action_id: 'int(11) NOT NULL',                    // ID người nhân viên
        service_id: 'int(11) NOT NULL',                  // ID dịch vụ, bắt buộc
        price: 'int(11) DEFAULT 0',                      // Giá của dịch vụ, mặc định là 0
        status: "enum('pending', 'processing', 'completed', 'canceled') DEFAULT 'pending'", // Trạng thái dịch vụ
        name: 'varchar(255) NULL',                       // Tên dịch vụ
        address: 'varchar(255) NULL',                       // Tên dịch vụ
        is_home_service: 'tinyint(1) DEFAULT 0',         // Dịch vụ tại nhà hay không, mặc định là 0
        date: 'date NULL',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP', // Thời gian tạo bản ghi
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' // Thời gian cập nhật bản ghi
    },
    getAll: async (page = 1, pageSize = 10, user_id = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT su.*, u.id AS user_id, u.name AS user_name, u.email AS user_email, u.phone AS user_phone
            FROM ${ServiceUser.tableName} su LEFT JOIN users u ON su.user_id = u.id`;
        let countQuery = `SELECT COUNT(*) as total FROM ${ServiceUser.tableName}`;
        const queryParams = [];

        // Thêm điều kiện lọc theo `user_id` nếu có
        if (user_id) {
            query += ' WHERE user_id = ?';
            countQuery += ' WHERE user_id = ?';
            queryParams.push(user_id);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, user_id ? [user_id] : []);
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
    // Phương thức thêm đăng ký dịch vụ mới
    create: async (userServiceData) => {
        const query = `
            INSERT INTO ${ServiceUser.tableName} (user_id, service_id, price, status, name, is_home_service)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            userServiceData.user_id,
            userServiceData.service_id,
            userServiceData.price || 0,
            userServiceData.status || 'pending',
            userServiceData.name || null,
            userServiceData.is_home_service || false
        ];

        const [result] = await db.query(query, values);
        return result.insertId ? { id: result.insertId, ...userServiceData } : null;
    },

    // Phương thức lấy thông tin đăng ký dịch vụ theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${ServiceUser.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Phương thức cập nhật thông tin đăng ký dịch vụ theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${ServiceUser.tableName} 
            SET user_id = ?, service_id = ?, price = ?, status = ?, name = ?, is_home_service = ?
            WHERE id = ?`;
        const values = [
            updateData.user_id,
            updateData.service_id,
            updateData.price || 0,
            updateData.status || 'pending',
            updateData.name || null,
            updateData.is_home_service || false,
            id
        ];

        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await ServiceUser.findById(id) : null;
    },

    // Phương thức xóa thông tin đăng ký dịch vụ theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${ServiceUser.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = ServiceUser;
