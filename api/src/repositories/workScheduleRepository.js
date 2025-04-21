const db = require('../config/dbMysql');

const WorkScheduleRepository = {
    tableName: 'work_schedule',

    getAll: async (params = {}) => {
        let query = `
            SELECT ws.*, u.name as staff_name, s.name as shift_name, s.start_time, s.end_time
            FROM ${WorkScheduleRepository.tableName} ws
            JOIN users u ON ws.staff_id = u.id
            JOIN shifts s ON ws.shift_id = s.id
            WHERE 1=1
        `;
        const queryParams = [];

        if (params.staff_id) {
            query += ' AND ws.staff_id = ?';
            queryParams.push(params.staff_id);
        }

        if (params.work_date) {
            query += ' AND ws.work_date = ?';
            queryParams.push(params.work_date);
        }

        if (params.status) {
            query += ' AND ws.status = ?';
            queryParams.push(params.status);
        }

        query += ' ORDER BY ws.work_date DESC, s.start_time ASC';

        const [rows] = await db.query(query, queryParams);
        return rows;
    },

    findById: async (id) => {
        const query = `
            SELECT ws.id, ws.staff_id, ws.work_date, ws.shift_id, ws.status, ws.created_at, ws.updated_at
            FROM ${WorkScheduleRepository.tableName} ws
            WHERE ws.id = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    create: async (scheduleData) => {
        const query = `
            INSERT INTO ${WorkScheduleRepository.tableName} (staff_id, work_date, shift_id, status)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [
            scheduleData.staff_id,
            scheduleData.work_date,
            scheduleData.shift_id,
            scheduleData.status || 'pending'
        ]);
        return result.insertId;
    },

    update: async (id, data) => {
        try {
            console.log('Repository - Updating work schedule:', { id, data });
            
            // Build SET clause dynamically based on provided fields
            const setClause = Object.entries(data)
                .filter(([key]) => key !== 'id') // Exclude id from update
                .map(([key]) => `${key} = ?`)
                .join(', ');
                
            const values = Object.entries(data)
                .filter(([key]) => key !== 'id')
                .map(([_, value]) => value);
                
            // Add id to values array
            values.push(id);
            
            const query = `
                UPDATE ${WorkScheduleRepository.tableName}
                SET ${setClause}
                WHERE id = ?
            `;
            
            console.log('Repository - Update query:', query);
            console.log('Repository - Update values:', values);
            
            const [result] = await db.query(query, values);
            console.log('Repository - Update result:', result);
            
            return result;
        } catch (error) {
            console.error('Repository - Error updating work schedule:', error);
            throw error;
        }
    },

    delete: async (id) => {
        const query = `DELETE FROM ${WorkScheduleRepository.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    },

    getAvailableStaff: async (work_date, shift_id) => {
        const query = `
            SELECT u.* 
            FROM users u
            LEFT JOIN ${WorkScheduleRepository.tableName} ws 
                ON u.id = ws.staff_id 
                AND ws.work_date = ? 
                AND ws.shift_id = ?
            WHERE ws.id IS NULL
            AND u.role = 'staff'
        `;
        const [rows] = await db.query(query, [work_date, shift_id]);
        return rows;
    }
};

module.exports = WorkScheduleRepository; 