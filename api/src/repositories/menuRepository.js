const db = require('../config/dbMysql');

const MenuRepository = {
    tableName: 'bl_menus',

    getAll: async (offset, pageSize, name = null) => {
        let query = `SELECT * FROM ${MenuRepository.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${MenuRepository.tableName}`;
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

        return { data: rows, total };
    },

    findById: async (id) => {
        const query = `SELECT * FROM ${MenuRepository.tableName} WHERE id = ? LIMIT 1`;
        const [rows] = await db.query(query, [id]);
        return rows?.length > 0 ? rows[0] : null;
    },

    create: async (menuData) => {
        const query = `
            INSERT INTO ${MenuRepository.tableName} (name, slug, description, status, is_featured) 
            VALUES (?, ?, ?, ?, ?)`;
        const values = [
            menuData.name,
            menuData.slug,
            menuData.description || null,
            menuData.status || 'pending',
            menuData.is_featured || 0
        ];
        const [result] = await db.query(query, values);
        return result.insertId;
    },

    updateById: async (id, updateData) => {
        const query = `
            UPDATE ${MenuRepository.tableName} 
            SET name = ?, slug = ?, description = ?, status = ?, is_featured = ?
            WHERE id = ?`;
        const values = [
            updateData.name,
            updateData.slug,
            updateData.description || null,
            updateData.status || 'pending',
            updateData.is_featured || 0,
            id
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0;
    },

    deleteById: async (id) => {
        const query = `DELETE FROM ${MenuRepository.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = MenuRepository;
