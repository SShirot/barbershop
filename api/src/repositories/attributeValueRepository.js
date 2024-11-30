const db = require('../config/dbMysql');

const AttributeValueRepository = {
    tableName: 'ec_attribute_values',
    // Lấy tất cả các thuộc tính (hỗ trợ phân trang, tìm kiếm theo tên, và lọc theo attribute_id)
    getAll: async (offset = 0, pageSize = 10, req = {}) => {
        const { name, attribute_id } = req; // Lấy các tham số từ request
        let query = `SELECT * FROM ${AttributeValueRepository.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${AttributeValueRepository.tableName}`;
        const queryParams = [];
        const countParams = [];

        // Lọc theo name hoặc attribute_id
        let whereClause = [];
        if (name) {
            whereClause.push('title LIKE ?');
            queryParams.push(`%${name}%`);
            countParams.push(`%${name}%`);
        }
        if (attribute_id) {
            whereClause.push('attribute_id = ?');
            queryParams.push(attribute_id);
            countParams.push(attribute_id);
        }

        if (whereClause.length > 0) {
            const whereSQL = ` WHERE ${whereClause.join(' AND ')}`;
            query += whereSQL;
            countQuery += whereSQL;
        }

        // Thêm phân trang
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(pageSize, offset);

        // Truy vấn dữ liệu và tổng số lượng
        const [rows] = await db.query(query, queryParams);
        const [countResult] = await db.query(countQuery, countParams);
        const total = countResult[0]?.total || 0;

        return { data: rows, total };
    }
};

module.exports = AttributeValueRepository;
