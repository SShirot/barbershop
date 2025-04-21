const db = require('../config/dbMysql');

const ShiftsRepository = {
    tableName: 'shifts',

    getAll: async () => {
        const query = `SELECT * FROM ${ShiftsRepository.tableName}`;
        const [rows] = await db.query(query);
        return rows;
    },

    findById: async (id) => {
        const query = `SELECT * FROM ${ShiftsRepository.tableName} WHERE id = ?`;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    create: async (shiftData) => {
        const query = `
            INSERT INTO ${ShiftsRepository.tableName} (name, start_time, end_time)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.query(query, [
            shiftData.name,
            shiftData.start_time,
            shiftData.end_time
        ]);
        return result.insertId;
    },

    update: async (id, shiftData) => {
        const query = `
            UPDATE ${ShiftsRepository.tableName}
            SET name = ?, start_time = ?, end_time = ?
            WHERE id = ?
        `;
        const [result] = await db.query(query, [
            shiftData.name,
            shiftData.start_time,
            shiftData.end_time,
            id
        ]);
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const query = `DELETE FROM ${ShiftsRepository.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    }
};

module.exports = ShiftsRepository; 