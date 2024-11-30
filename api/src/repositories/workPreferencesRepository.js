const db = require('../config/dbMysql');

const WorkPreferencesRepository = {
    tableName: 'work_preferences',

    getAll: async (query = {}) => {
        const queryStr = `SELECT * FROM ${WorkPreferencesRepository.tableName}`;
        const [rows] = await db.query(queryStr); // Không cần tham số nếu không có điều kiện
        return rows; // Trả về toàn bộ danh sách bản ghi
    },
    findByUserId: async (userId) => {
        const query = `SELECT * FROM ${WorkPreferencesRepository.tableName} WHERE user_id = ? LIMIT 1`;
        const [rows] = await db.query(query, [userId]);
        return rows.length > 0 ? rows[0] : null; // Nếu tìm thấy thì trả về bản ghi, không thì trả về null
    },

    updateOrCreate: async (userId, preferencesData) => {
        // Kiểm tra nếu user đã tồn tại trong bảng
        const existingPreference = await WorkPreferencesRepository.findByUserId(userId);

        if (existingPreference) {
            // Nếu đã tồn tại, thực hiện cập nhật
            const query = `
                UPDATE ${WorkPreferencesRepository.tableName}
                SET 
                    shift_morning = ?, 
                    shift_afternoon = ?, 
                    shift_night = ?, 
                    full_week = ?, 
                    off_saturday = ?, 
                    off_sunday = ?, 
                    updated_at = NOW()
                WHERE user_id = ?
            `;
            const values = [
                preferencesData.shift_morning || 0,
                preferencesData.shift_afternoon || 0,
                preferencesData.shift_night || 0,
                preferencesData.full_week || 0,
                preferencesData.off_saturday || 0,
                preferencesData.off_sunday || 0,
                userId
            ];
            const [result] = await db.query(query, values);
            return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
        } else {
            const query = `
                INSERT INTO ${WorkPreferencesRepository.tableName} 
                (user_id, shift_morning, shift_afternoon, shift_night, full_week, off_saturday, off_sunday, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;
            const values = [
                userId,
                preferencesData.shift_morning || 0,
                preferencesData.shift_afternoon || 0,
                preferencesData.shift_night || 0,
                preferencesData.full_week || 0,
                preferencesData.off_saturday || 0,
                preferencesData.off_sunday || 0
            ];
            const [result] = await db.query(query, values);
            return result.insertId; // Trả về ID của bản ghi mới
        }
    }
};

module.exports = WorkPreferencesRepository;
