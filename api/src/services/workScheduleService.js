exports.getAll = async (params = {}) => {
    try {
        console.log('=== WorkScheduleService.getAll Start ===');
        console.log('1. Received params:', params);

        const { staff_id, start_date, end_date } = params;
        const conditions = [];
        const values = [];

        if (staff_id) {
            conditions.push('staff_id = ?');
            values.push(staff_id);
        }

        if (start_date && end_date) {
            conditions.push('work_date BETWEEN ? AND ?');
            values.push(start_date, end_date);
        }

        const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
        
        const query = `
            SELECT ws.*, u.fullname as staff_name, u.email as staff_email
            FROM work_schedules ws
            LEFT JOIN users u ON ws.staff_id = u.id
            ${whereClause}
            ORDER BY ws.work_date ASC
        `;

        console.log('2. Executing query:', query);
        console.log('3. With values:', values);

        const schedules = await db.query(query, values);
        console.log('4. Found schedules:', schedules);

        return schedules;
    } catch (error) {
        console.error('Error in WorkScheduleService.getAll:', error);
        throw error;
    }
}; 