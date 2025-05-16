// models/ServiceUser.js
const db = require('../config/dbMysql');

const ServiceUser = {
    tableName: 'services_user',
    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        user_id: 'bigint(20) UNSIGNED',
        service_id: 'bigint(20) UNSIGNED',
        staff_id: 'bigint(20) UNSIGNED',
        price: 'int(11) DEFAULT 0',
        status: 'ENUM("pending","processing","completed","canceled") DEFAULT "pending"',
        name: 'varchar(255)',
        is_home_service: 'tinyint(1) DEFAULT 0',
        address: 'text',
        date: 'date',
        time: 'time',
        note: 'text',
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `
            SELECT 
            su.*,
            s.name AS service_name,
            s.price AS service_price,
            u.name AS user_name,
            u.email AS user_email,
            u.phone AS user_phone,
            st.name AS staff_name
        FROM ${ServiceUser.tableName} su
        LEFT JOIN services s ON su.service_id = s.id
        LEFT JOIN users u ON su.user_id = u.id
        LEFT JOIN users st ON su.staff_id = st.id

        `;
        let countQuery = `
            SELECT COUNT(*) as total 
            FROM ${ServiceUser.tableName} su
            LEFT JOIN services s ON su.service_id = s.id
            LEFT JOIN users u ON su.user_id = u.id
        `;
        const queryParams = [];

        if (name) {
            query += ' WHERE s.name LIKE ? OR u.name LIKE ?';
            countQuery += ' WHERE s.name LIKE ? OR u.name LIKE ?';
            queryParams.push(`%${name}%`, `%${name}%`);
        }

        query += ' ORDER BY su.created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, name ? [`%${name}%`, `%${name}%`] : []);
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
    getServiceByStaffId: async (staff_id, page = 1, pageSize = 10) => {
        try {
            const offset = (page - 1) * pageSize;
            
            // Query để lấy tổng số records
            const countQuery = `
                SELECT COUNT(*) as total 
                FROM ${ServiceUser.tableName} 
                WHERE staff_id = ? AND status = 'processing'
            `;
            const [countResult] = await db.query(countQuery, [staff_id]);
            const total = countResult[0].total;
    
            // Query chính để lấy dữ liệu
            const query = `
                SELECT 
                    su.*,
                    u.name as user_name,
                    s.name as service_name,
                    st.name as staff_name
                FROM ${ServiceUser.tableName} su
                LEFT JOIN users u ON su.user_id = u.id
                LEFT JOIN services s ON su.service_id = s.id
                LEFT JOIN users st ON su.staff_id = st.id
                WHERE su.staff_id = ? AND su.status = 'processing'
                ORDER BY su.created_at DESC 
                LIMIT ? OFFSET ?
            `;
            
            const [rows] = await db.query(query, [staff_id, pageSize, offset]);
    
            return {
                data: rows,
                meta: {
                    total,
                    perPage: pageSize,
                    currentPage: page,
                    lastPage: Math.ceil(total / pageSize),
                    page_size: pageSize,
                    total_page: Math.ceil(total / pageSize)
                }
            };
        } catch (error) {
            console.error('Error in getServiceByStaffId:', error);
            throw new Error('Failed to fetch services for staff');
        }
    },
    getServiceByUserId: async (user_id, page = 1, pageSize = 10) => {
        try {
            const offset = (page - 1) * pageSize;
    
            // Đếm tổng số lịch của user
            const countQuery = `
                SELECT COUNT(*) as total 
                FROM ${ServiceUser.tableName} 
                WHERE user_id = ?
            `;
            const [countResult] = await db.query(countQuery, [user_id]);
            const total = countResult[0].total;
    
            // Query chính để lấy dữ liệu lịch của user
            const query = `
                SELECT 
                    su.*,
                    u.name as user_name,
                    s.name as service_name,
                    st.name as staff_name
                FROM ${ServiceUser.tableName} su
                LEFT JOIN users u ON su.user_id = u.id
                LEFT JOIN services s ON su.service_id = s.id
                LEFT JOIN users st ON su.staff_id = st.id
                WHERE su.user_id = ?
                ORDER BY su.created_at DESC 
                LIMIT ? OFFSET ?
            `;
    
            const [rows] = await db.query(query, [user_id, pageSize, offset]);
    
            return {
                data: rows,
                meta: {
                    total,
                    perPage: pageSize,
                    currentPage: page,
                    lastPage: Math.ceil(total / pageSize),
                    page_size: pageSize,
                    total_page: Math.ceil(total / pageSize)
                }
            };
        } catch (error) {
            console.error('Error in getServiceByUserId:', error);
            throw new Error('Failed to fetch services for user');
        }
    },
    
    findById: async (id) => {
        const query = `
            SELECT 
            su.*,
            s.name AS service_name,
            s.price AS service_price,
            u.name AS user_name,
            u.email AS user_email,
            u.phone AS user_phone,
            st.name AS staff_name
        FROM ${ServiceUser.tableName} su
        LEFT JOIN services s ON su.service_id = s.id
        LEFT JOIN users u ON su.user_id = u.id
        LEFT JOIN users st ON su.staff_id = st.id
        WHERE su.id = ?
        LIMIT 1
        `;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },
    create: async (serviceUserData) => {
        const query = `
            INSERT INTO ${ServiceUser.tableName} 
            (user_id, service_id, staff_id, price, status, name, address,  date, time,is_home_service, note) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            serviceUserData.user_id,
            serviceUserData.service_id,
            serviceUserData.staff_id || null,
            serviceUserData.price || 0,
            serviceUserData.status || 'pending',
            serviceUserData.name,
            serviceUserData.address || null,
            serviceUserData.date || null,
            serviceUserData.time || null,
            serviceUserData.is_home_service || 0,
            serviceUserData.note || null
        ];
        const [result] = await db.query(query, values);
        return await ServiceUser.findById(result.insertId);
    },
    updateById: async (id, updateData) => {
        const allowedStatus = ['pending', 'processing', 'completed', 'canceled'];
    
        if (updateData.status && !allowedStatus.includes(updateData.status)) {
            throw new Error(`Invalid status value: ${updateData.status}`);
        }
    
        const query = `
            UPDATE ${ServiceUser.tableName} 
            SET 
                staff_id = ?,
                status = ?,
                note = ?
            WHERE id = ?
        `;
        const values = [
            updateData.staff_id || null,
            updateData.status,
            updateData.note || null,
            id
        ];
    
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await ServiceUser.findById(id) : null;
    },
    deleteById: async (id) => {
        const query = `DELETE FROM ${ServiceUser.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    },
    findAllWithDetails: async () => {
        try {
            
            console.log("👉 MODEL findAllWithDetails ĐƯỢC GỌI");
            const query = `
                SELECT 
                    su.*,
                    s.name AS service_name,
                    s.price AS service_price,
                    u.name AS user_name,
                    u.email AS user_email,
                    u.phone AS user_phone,
                    staff.name AS staff_name
                FROM services_user su
                LEFT JOIN services s ON su.service_id = s.id
                LEFT JOIN users u ON su.user_id = u.id
                LEFT JOIN users staff ON su.staff_id = staff.id;
            `;
            console.log('SQL Query:', query);
            
            const [rows] = await db.query(query);
            console.log('Raw rows:', rows);
            console.log('First row keys:', Object.keys(rows[0] || {}));
            console.log('First row staff_name:', rows[0]?.staff_name);
            console.log('Query result:', JSON.stringify(rows, null, 2));
            
            // Kiểm tra và log từng row
            rows.forEach((row, index) => {
                console.log(`Row ${index} staff_id:`, row.staff_id);
                console.log(`Row ${index} staff_name:`, row.staff_name);
            });
            
            return rows;
        } catch (error) {
            console.error("❌ Error in findAllWithDetails:", error);
            console.error("Error stack:", error.stack);
            throw error;
        }
    },
    assignService: async (service_id, staff_id, schedule_id, note) => {
        const query = `
            INSERT INTO ${ServiceUser.tableName} 
            (user_id, service_id, staff_id, price, status, name, address,  date, time,is_home_service, note) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            service_id,
            staff_id,
            schedule_id,
            note
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await ServiceUser.findById(result.insertId) : null;
    }
};

module.exports = ServiceUser;
