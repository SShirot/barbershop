const db = require('./../config/dbMysql');

const User = {
    tableName: 'users',  // Tên bảng

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        email: 'varchar(255)',
        email_verified_at: 'timestamp NULL',
        password: 'varchar(255)',
        phone: 'varchar(255)',
        provider: 'varchar(255) NULL',
        provider_id: 'varchar(255) NULL',
        status: 'tinyint(4) DEFAULT 1',
        avatar: 'varchar(255) NULL',
        remember_token: 'varchar(100) NULL',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${User.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${User.tableName}`;
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

    // Tạo phương thức findOne để tìm người dùng theo email
    findOne: async (email) => {
        const query = `SELECT * FROM ${User.tableName} WHERE email = ? LIMIT 1`;
        const [rows] = await db.query(query, [email]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Tạo phương thức create để tạo người dùng mới
    create: async (userData) => {
        const query = `INSERT INTO ${User.tableName} (name, email, password, avatar, phone) VALUES (?, ?, ?, ?, ?)`;
        const { name, email, password, avatar, phone } = userData;
        const [result] = await db.query(query, [name, email, password, avatar, phone]);
        return result.insertId;
    },
    update: async (id, updatedData) => {
        // const fields = Object.keys(updatedData).map(field => `${field} = ?`).join(', ');
        // const values = Object.values(updatedData);
        // const query = `UPDATE ${User.tableName} SET ${fields} WHERE id = ?`;
        // values.push(id);
        // const [result] = await db.query(query, values);
        // return result.affectedRows > 0;
        console.info("===========[] ===========[updatedData] : ",updatedData);
        // Kiểm tra nếu updatedData không có trường nào để cập nhật
        if (!updatedData || Object.keys(updatedData).length === 0) {
            throw new Error('No data provided to update');
        }

        // Tạo danh sách các trường cần cập nhật và giá trị tương ứng
        const fields = Object.keys(updatedData).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updatedData);

        // Xây dựng câu lệnh SQL
        const query = `UPDATE ${User.tableName} SET ${fields} WHERE id = ?`;
        values.push(id);

        // Thực hiện câu truy vấn
        const [result] = await db.query(query, values);
        return result.affectedRows > 0;

    },
    delete: async (id) => {
        const query = `DELETE FROM ${User.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    },
    findOneById: async (id) => {
        const query = `SELECT * FROM ${User.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },
};

module.exports = User;
