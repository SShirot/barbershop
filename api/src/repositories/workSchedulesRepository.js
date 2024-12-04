const db = require('../config/dbMysql');

const WorkSchedulesRepository = {
    tableName: 'work_schedules',
    getList: async (offset, pageSize, query = {}) => {
        let query = `
            SELECT ws.*, u.name AS user_name, u.email AS user_email 
            FROM ${WorkSchedulesRepository.tableName} ws
            INNER JOIN users u ON ws.user_id = u.id
        `;
        let countQuery = `
            SELECT COUNT(*) as total 
            FROM ${WorkSchedulesRepository.tableName} ws
            INNER JOIN users u ON ws.user_id = u.id
        `;
        const queryParams = [];
        const countParams = [];

        let whereClause = ' WHERE 1=1';

        // Lọc theo user_id nếu có
        if (query.user_id) {
            whereClause += ' AND ws.user_id = ?';
            queryParams.push(query.user_id);
            countParams.push(query.user_id);
        }

        // Lọc theo ngày bắt đầu nếu có
        if (query.start_date) {
            whereClause += ' AND ws.work_date >= ?';
            queryParams.push(query.start_date);
            countParams.push(query.start_date);
        }

        // Lọc theo ngày kết thúc nếu có
        if (query.end_date) {
            whereClause += ' AND ws.work_date <= ?';
            queryParams.push(query.end_date);
            countParams.push(query.end_date);
        }

        query += whereClause;
        countQuery += whereClause;

        // Thêm sắp xếp và phân trang
        query += ' ORDER BY ws.work_date DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        // Thực thi câu truy vấn
        try {
            const [rows] = await db.query(query, queryParams);
            const [countResult] = await db.query(countQuery, countParams);
            const total = countResult[0].total;

            return { data: rows, total };
        } catch (error) {
            console.error('Error fetching work schedules:', error);
            throw error;
        }
    }
};

module.exports = WorkSchedulesRepository;
