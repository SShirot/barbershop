const db = require('../config/dbMysql'); // Đảm bảo kết nối MySQL được thiết lập đúng

const SettingInformation = {
    tableName: 'setting_information',

    // Lấy thông tin website (chỉ 1 bản ghi)
    getInfo: async () => {
        const query = `SELECT * FROM ${SettingInformation.tableName} LIMIT 1`;
        const [rows] = await db.query(query);
        return rows.length > 0 ? rows[0] : null;
    },

    // Tạo mới thông tin website
    create: async (data) => {
        const query = `
            INSERT INTO ${SettingInformation.tableName} 
            (logo, favicon, name, email, full_address, map, fax, contact_number, copyright) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.logo || null,
            data.favicon || null,
            data.name || null,
            data.email || null,
            data.full_address || null,
            data.map || null,
            data.fax || null,
            data.contact_number || null,
            data.copyright || null,
        ];
        const [result] = await db.query(query, values);
        return result.insertId ? await SettingInformation.getInfo() : null;
    },

    // Cập nhật thông tin website (bản ghi duy nhất)
    update: async (id, data) => {
        const query = `
            UPDATE ${SettingInformation.tableName} 
            SET logo = ?, favicon = ?, name = ?, email = ?, full_address = ?, map = ?, fax = ?, 
                contact_number = ?, copyright = ?
            WHERE id = ?
        `;
        const values = [
            data.logo || null,
            data.favicon || null,
            data.name || null,
            data.email || null,
            data.full_address || null,
            data.map || null,
            data.fax || null,
            data.contact_number || null,
            data.copyright || null,
            id,
        ];
        const [result] = await db.query(query, values);
        return result.affectedRows > 0 ? await SettingInformation.getInfo() : null;
    },
};

module.exports = SettingInformation;
