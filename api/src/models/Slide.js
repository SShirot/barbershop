const db = require('../config/dbMysql');

const Slide = {
    tableName: 'slides',

    columns: {
        id: 'bigint(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY',
        name: 'varchar(255)',
        description: 'varchar(255)',
        position: 'tinyint(4) DEFAULT 1',
        page: 'varchar(255) DEFAULT "home"',
        link: 'varchar(255)',
        avatar: 'varchar(255)',
        status: "enum('published', 'draft', 'pending') DEFAULT 'pending'",
        created_at: 'timestamp DEFAULT CURRENT_TIMESTAMP',
        updated_at: 'timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    },

    // Phương thức lấy danh sách slides với phân trang và tìm kiếm
    getAll: async (page = 1, pageSize = 10, name = null, page_site) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${Slide.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Slide.tableName}`;
        const queryParams = [];
        const countParams = [];

        if (name) {
            query += ' WHERE name LIKE ?';
            countQuery += ' WHERE name LIKE ?';
            queryParams.push(`%${name}%`);
            countParams.push(`%${name}%`);
        }

        if (page_site) {
            query += ' WHERE page LIKE ?';
            countQuery += ' WHERE page LIKE ?';
            queryParams.push(`%${page_site}%`);
            countParams.push(`%${page_site}%`);
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
                currentPage: page,
                lastPage: Math.ceil(total / pageSize),
                page_size: pageSize,
                total_page: Math.ceil(total / pageSize),
            }
        };
    },

    // Phương thức tìm slide theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${Slide.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Phương thức tạo mới slide
    create: async (slideData) => {
        const query = `INSERT INTO ${Slide.tableName} (name, description, position, page, link, avatar, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            slideData.name,
            slideData.description || null,
            slideData.position || 1,
            slideData.page || 'home',
            slideData.link || null,
            slideData.avatar || null,
            slideData.status || 'pending'
        ];
        const [result] = await db.query(query, values);
        return await Slide.findById(result.insertId);
    },

    // Phương thức cập nhật slide theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${Slide.tableName} 
            SET name = ?, description = ?, position = ?, page = ?, link = ?, avatar = ?, status = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.description || null,
            updateData.position || 1,
            updateData.page || 'home',
            updateData.link || null,
            updateData.avatar || null,
            updateData.status || 'pending',
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await Slide.findById(id) : null;
    },

    // Phương thức xóa slide theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${Slide.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Slide;
