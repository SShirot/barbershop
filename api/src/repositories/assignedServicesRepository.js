const db = require('../config/dbMysql');

const AssignedServicesRepository = {
    tableName: 'assigned_services',

    getAll: async (params = {}) => {
        let query = `
            SELECT a.*, 
                   su.name as service_name, 
                   u1.name as staff_name,
                   u2.name as customer_name,
                   ws.work_date,
                   s.name as shift_name,
                   s.start_time,
                   s.end_time
            FROM ${AssignedServicesRepository.tableName} a
            JOIN services_user su ON a.services_user_id = su.id
            JOIN users u1 ON a.staff_id = u1.id
            JOIN users u2 ON su.user_id = u2.id
            JOIN work_schedule ws ON a.schedule_id = ws.id
            JOIN shifts s ON ws.shift_id = s.id
            WHERE 1=1
        `;
        const queryParams = [];

        if (params.staff_id) {
            query += ' AND a.staff_id = ?';
            queryParams.push(params.staff_id);
        }

        if (params.schedule_id) {
            query += ' AND a.schedule_id = ?';
            queryParams.push(params.schedule_id);
        }

        if (params.services_user_id) {
            query += ' AND a.services_user_id = ?';
            queryParams.push(params.services_user_id);
        }

        query += ' ORDER BY ws.work_date DESC, s.start_time ASC';

        const [rows] = await db.query(query, queryParams);
        return rows;
    },

    findById: async (id) => {
        const query = `
            SELECT a.*, 
                   su.name as service_name, 
                   u1.name as staff_name,
                   u2.name as customer_name,
                   ws.work_date,
                   s.name as shift_name,
                   s.start_time,
                   s.end_time
            FROM ${AssignedServicesRepository.tableName} a
            JOIN services_user su ON a.services_user_id = su.id
            JOIN users u1 ON a.staff_id = u1.id
            JOIN users u2 ON su.user_id = u2.id
            JOIN work_schedule ws ON a.schedule_id = ws.id
            JOIN shifts s ON ws.shift_id = s.id
            WHERE a.id = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    create: async (assignmentData) => {
        const query = `
            INSERT INTO ${AssignedServicesRepository.tableName} 
            (services_user_id, staff_id, schedule_id, note)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [
            assignmentData.services_user_id,
            assignmentData.staff_id,
            assignmentData.schedule_id,
            assignmentData.note || null
        ]);
        return result.insertId;
    },

    update: async (id, assignmentData) => {
        const query = `
            UPDATE ${AssignedServicesRepository.tableName}
            SET services_user_id = ?, staff_id = ?, schedule_id = ?, note = ?
            WHERE id = ?
        `;
        const [result] = await db.query(query, [
            assignmentData.services_user_id,
            assignmentData.staff_id,
            assignmentData.schedule_id,
            assignmentData.note,
            id
        ]);
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const query = `DELETE FROM ${AssignedServicesRepository.tableName} WHERE id = ?`;
        const [result] = await db.query(query, [id]);
        return result.affectedRows > 0;
    },

    getStaffAssignments: async (staff_id, date) => {
        const query = `
            SELECT a.*, 
                   su.name as service_name, 
                   u2.name as customer_name,
                   ws.work_date,
                   s.name as shift_name,
                   s.start_time,
                   s.end_time
            FROM ${AssignedServicesRepository.tableName} a
            JOIN services_user su ON a.services_user_id = su.id
            JOIN users u2 ON su.user_id = u2.id
            JOIN work_schedule ws ON a.schedule_id = ws.id
            JOIN shifts s ON ws.shift_id = s.id
            WHERE a.staff_id = ? AND ws.work_date = ?
            ORDER BY s.start_time ASC
        `;
        const [rows] = await db.query(query, [staff_id, date]);
        return rows;
    }
};

module.exports = AssignedServicesRepository; 