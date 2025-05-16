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

    getAll: async (page = 1, pageSize = 10, name = null, user_type = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${User.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${User.tableName}`;
        const queryParams = [];
        const countParams = [];

        const conditions = [];
        if (name) {
            conditions.push('name LIKE ?');
            queryParams.push(`%${name}%`);
            countParams.push(`%${name}%`);
        }
        if (user_type) {
            conditions.push('user_type LIKE ?');
            queryParams.push(`%${user_type}%`);
            countParams.push(`%${user_type}%`);
        }

        if (conditions.length > 0) {
            const whereClause = ` WHERE ${conditions.join(' AND ')}`;
            query += whereClause;
            countQuery += whereClause;
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, countParams);
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
    },
    getStaffListByDate: async ({ role, is_active, date, time }) => {
        try {
            console.log('=== UserRepository.getStaffList Start ===');
            
            let query = `
                SELECT 
                    u.id AS staff_id,
                    u.name AS staff_name,
                    COUNT(su.id) AS assigned_count,
                    s.name AS shift_name,
                    s.start_time,
                    s.end_time
                FROM users u
                JOIN work_schedule ws ON ws.staff_id = u.id
                JOIN shifts s ON s.id = ws.shift_id
                LEFT JOIN services_user su 
                    ON su.staff_id = u.id 
                    AND su.date = ws.work_date 
                    AND su.status IN ('PENDING', 'APPROVED')
                WHERE 
                    u.user_type = ?
                    AND u.status = 2  -- Đã sửa lại cho đúng với giá trị trong DB
            `;
    
            const params = [role];
    
            if (is_active) {
                query += " AND u.status IN (2, 'VERIFIED')"; // Nếu active là true, chỉ lấy những staff đang hoạt động
            }
    
            if (date && time) {
                query += `
                    AND ws.work_date = ?
                    AND ? BETWEEN s.start_time AND s.end_time
                `;
                params.push(date, time);
            }
    
            query += `
                GROUP BY u.id, u.name, s.name, s.start_time, s.end_time
                HAVING assigned_count < 5
                ORDER BY u.name ASC;
            `;
            
            console.log('1. Executing query:', query);
            console.log('2. With params:', params);
            
            const [rows] = await db.query(query, params);
            console.log('3. Query executed successfully');
            console.log('4. Found staff members:', rows?.length);
            
            if (rows?.length === 0) {
                console.log('5. Warning: No staff found available for the specified time.');
            }
    
            console.log('=== UserRepository.getStaffList End ===');
            return rows; // Trả về kết quả là danh sách nhân viên
        } catch (error) {
            console.error('Error in UserRepository.getStaffList:', error);
            throw error;
        }
    }
};

module.exports = User;
