const db = require('../config/dbMysql');
const HairSwap = require('../models/HairSwap');
const HairswapRepository = {
    
    create: async (data) => {
        const [result] = await db.query(`INSERT INTO ${HairSwap.tableName} SET ?`, [data]);
        return result.insertId;
    },

    updateById: async (id, data) => {
        const [result] = await db.query(`UPDATE ${HairSwap.tableName} SET ? WHERE id = ?`, [data, id]);
        return result.affectedRows > 0;
    },

    deleteById: async (id) => {
        const [result] = await db.query(`DELETE FROM ${HairSwap.tableName} WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    },

    getAll: async (offset = 0, pageSize = 10, name = null) => {
        let query = `SELECT * FROM ${HairSwap.tableName}`;
        let countQuery = `SELECT COUNT(*) as total FROM ${HairSwap.tableName}`;
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

        const totalPage = Math.ceil(total / pageSize);
        
        return { data: rows, meta: { total, pageSize, offset, totalPage } };
    },

    getById: async (id) => {
        const [rows] = await db.query(`SELECT * FROM ${HairSwap.tableName} WHERE id = ?`, [id]);
        return rows[0];
    },

    getByGender: async (gender) => {
        const [rows] = await db.query(`SELECT * FROM ${HairSwap.tableName} WHERE gender = ?`, [gender]);
        return rows;
    },

    getByGenderAndId: async (gender, id) => {
        const [rows] = await db.query(`SELECT * FROM ${HairSwap.tableName} WHERE gender = ? AND id = ?`, [gender, id]);
        return rows[0];
    },
    getPaged: async (page = 1, pageSize = 10) => {
        const offset = (page - 1) * pageSize;
        const [rows] = await db.query(`SELECT * FROM ${HairSwap.tableName} LIMIT ? OFFSET ?`, [pageSize, offset]);
        return rows;
    },
    
    getTotalCount: async () => {
        const [result] = await db.query(`SELECT COUNT(*) as total FROM ${HairSwap.tableName}`);
        return result[0].total;
    }
    
}
module.exports = HairswapRepository;
