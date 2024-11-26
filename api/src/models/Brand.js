const db = require('../config/dbMysql'); // Kết nối MySQL

const Brand = {
    tableName: 'ec_brands',

    // Lấy danh sách brands
    getAll: async (page = 1, pageSize = 10, name = null) => {
        const offset = (page - 1) * pageSize;
        let query = `SELECT * FROM ${Brand.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${Brand.tableName}`;
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

    // Lấy brand theo ID
    findById: async (id) => {
        const query = `SELECT * FROM ${Brand.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    // Thêm mới brand
    create: async (brandData) => {
        const query = `INSERT INTO ${Brand.tableName} 
            (name, slug, avatar, status, description, title_seo, description_seo, keywords_seo, index_seo, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;
        const values = [
            brandData.name,
            brandData.slug,
            brandData.avatar || null,
            brandData.status || 'pending',
            brandData.description || null,
            brandData.title_seo || null,
            brandData.description_seo || null,
            brandData.keywords_seo || null,
            brandData.index_seo || 1,
        ];
        const [result] = await db.query(query, values);
        return await Brand.findById(result.insertId);
    },

    // Cập nhật brand theo ID
    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${Brand.tableName} 
            SET name = ?, slug = ?, avatar = ?, status = ?, description = ?, title_seo = ?, description_seo = ?, keywords_seo = ?, index_seo = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.avatar || null,
            updateData.status || 'pending',
            updateData.description || null,
            updateData.title_seo || null,
            updateData.description_seo || null,
            updateData.keywords_seo || null,
            updateData.index_seo || 1,
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await Brand.findById(id) : null;
    },

    // Xóa brand theo ID
    deleteById: async (id) => {
        const query = `DELETE FROM ${Brand.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = Brand;
