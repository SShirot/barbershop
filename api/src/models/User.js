const db = require('./../config/dbMysql');

const USER_STATUS = {
    DISABLED: 0,
    ACTIVE: 1,
    VERIFIED: 2
};

const USER_TYPE = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    STAFF: 'STAFF'
};

const User = {
    tableName: 'users',  // Tên bảng
    STATUS: USER_STATUS,
    TYPE: USER_TYPE,

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        email: 'varchar(255)',
        email_verified_at: 'timestamp NULL',
        password: 'varchar(255)',
        user_type: "enum('USER', 'ADMIN','STAFF') DEFAULT 'USER'",
        phone: 'varchar(255)',
        provider: 'varchar(255) NULL',
        provider_id: 'varchar(255) NULL',
        status: 'tinyint(4) DEFAULT 1',
        avatar: 'varchar(255) NULL',
        remember_token: 'varchar(100) NULL',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    getAll: async (params = {}) => {
        let query = `SELECT * FROM ${User.tableName} WHERE 1=1`;
        const queryParams = [];

        if (params.name) {
            query += ' AND name LIKE ?';
            queryParams.push(`%${params.name}%`);
        }

        if (params.email) {
            query += ' AND email LIKE ?';
            queryParams.push(`%${params.email}%`);
        }

        if (params.user_type) {
            query += ' AND user_type = ?';
            queryParams.push(params.user_type);
        }

        if (params.status) {
            query += ' AND status = ?';
            queryParams.push(params.status);
        }

        query += ' ORDER BY created_at DESC';

        const [rows] = await db.query(query, queryParams);
        return rows;
    },

    // Tạo phương thức findOne để tìm người dùng theo email
    findOne: async (email) => {
        const query = `SELECT * FROM ${User.tableName} WHERE email = ? LIMIT 1`;
        const [rows] = await db.query(query, [email]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Tạo phương thức create để tạo người dùng mới
    create: async (userData) => {
        const query = `INSERT INTO ${User.tableName} (name, email, password, avatar, phone, user_type) VALUES (?, ?, ?, ?, ?, ?)`;
        const { name, email, password, avatar, phone, user_type } = userData;
        const [result] = await db.query(query, [name, email, password, avatar, phone, user_type]);
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
    // Thêm hàm mới để lấy danh sách nhân viên
    getStaffList: async () => {
        try {
            console.log('=== User.getStaffList Model Start ===');
            
            const query = `
                SELECT id, name, email, phone, avatar, status, user_type 
                FROM ${User.tableName} 
                WHERE user_type = ? 
                AND status IN (?, ?)
                ORDER BY name ASC
            `;
            
            const params = [
                USER_TYPE.STAFF,
                USER_STATUS.ACTIVE,
                USER_STATUS.VERIFIED
            ];
            
            console.log('1. Executing query:', query);
            console.log('2. With params:', params);
            
            const [rows] = await db.query(query, params);
            console.log('3. Query executed successfully');
            console.log('4. Found staff members:', rows?.length);
            
            if (rows?.length === 0) {
                console.log('5. Warning: No active or verified staff found');
            }
            
            // Map status to readable format
            const staffList = rows.map(staff => ({
                ...staff,
                statusText: staff.status === USER_STATUS.ACTIVE ? 'Active' : 
                           staff.status === USER_STATUS.VERIFIED ? 'Verified' : 
                           staff.status === USER_STATUS.DISABLED ? 'Disabled' : 'Unknown'
            }));
            
            console.log('=== User.getStaffList Model End ===');
            return staffList;
        } catch (error) {
            console.error('Error in User.getStaffList:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }
};

module.exports = User;
