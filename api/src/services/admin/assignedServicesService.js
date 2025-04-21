const Repository = require('../../repositories/assignedServicesRepository');
const WorkScheduleRepository = require('../../repositories/workScheduleRepository');
const ServiceUserRepository = require('../../models/ServiceUser');

const AssignedServicesService = {
    getAll: async (params) => {
        return await Repository.getAll(params);
    },

    findById: async (id) => {
        return await Repository.findById(id);
    },

    create: async (assignmentData) => {
        // Kiểm tra xem nhân viên có lịch trong ca đó không
        const schedule = await WorkScheduleRepository.findById(assignmentData.schedule_id);
        if (!schedule) {
            throw new Error('Lịch làm việc không tồn tại');
        }

        if (schedule.staff_id !== assignmentData.staff_id) {
            throw new Error('Nhân viên không có lịch trong ca này');
        }

        // Kiểm tra xem nhân viên đã có quá nhiều dịch vụ trong ca đó chưa
        const existingAssignments = await Repository.getAll({
            staff_id: assignmentData.staff_id,
            schedule_id: assignmentData.schedule_id
        });

        if (existingAssignments.length >= 5) { // Giới hạn 5 dịch vụ mỗi ca
            throw new Error('Nhân viên đã có quá nhiều dịch vụ trong ca này');
        }

        return await Repository.create(assignmentData);
    },

    update: async (id, assignmentData) => {
        return await Repository.update(id, assignmentData);
    },

    delete: async (id) => {
        return await Repository.delete(id);
    },

    getStaffAssignments: async (staff_id, date) => {
        return await Repository.getStaffAssignments(staff_id, date);
    },

    getUnassignedServices: async () => {
        // Lấy danh sách dịch vụ chưa được assign
        const query = `
            SELECT su.*, u.name as customer_name, s.name as service_name
            FROM services_user su
            JOIN users u ON su.user_id = u.id
            JOIN services s ON su.service_id = s.id
            LEFT JOIN assigned_services as ON su.id = as.services_user_id
            WHERE as.id IS NULL
            AND su.status = 'pending'
            ORDER BY su.date ASC
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    getStaffSchedule: async (staff_id, date) => {
        // Lấy lịch làm việc của nhân viên trong một ngày
        const query = `
            SELECT ws.*, s.name as shift_name, s.start_time, s.end_time,
                   COUNT(as.id) as assigned_count
            FROM work_schedule ws
            JOIN shifts s ON ws.shift_id = s.id
            LEFT JOIN assigned_services as ON ws.id = as.schedule_id
            WHERE ws.staff_id = ? AND ws.work_date = ?
            GROUP BY ws.id
            ORDER BY s.start_time ASC
        `;
        const [rows] = await db.query(query, [staff_id, date]);
        return rows;
    },

    getStaffAvailableSlots: async (staff_id, date) => {
        // Lấy các khung giờ trống của nhân viên trong một ngày
        const query = `
            SELECT ws.*, s.name as shift_name, s.start_time, s.end_time
            FROM work_schedule ws
            JOIN shifts s ON ws.shift_id = s.id
            LEFT JOIN assigned_services as ON ws.id = as.schedule_id
            WHERE ws.staff_id = ? 
            AND ws.work_date = ?
            AND as.id IS NULL
            ORDER BY s.start_time ASC
        `;
        const [rows] = await db.query(query, [staff_id, date]);
        return rows;
    },

    assignService: async (service_id, staff_id, schedule_id, note = null) => {
        // Kiểm tra xem dịch vụ đã được assign chưa
        const existingAssignment = await Repository.getAll({
            services_user_id: service_id
        });

        if (existingAssignment.length > 0) {
            throw new Error('Dịch vụ đã được assign cho nhân viên khác');
        }

        // Kiểm tra xem nhân viên có lịch trong ca đó không
        const schedule = await WorkScheduleRepository.findById(schedule_id);
        if (!schedule || schedule.staff_id !== staff_id) {
            throw new Error('Nhân viên không có lịch trong ca này');
        }

        // Kiểm tra xem nhân viên đã có quá nhiều dịch vụ trong ca đó chưa
        const existingAssignments = await Repository.getAll({
            staff_id: staff_id,
            schedule_id: schedule_id
        });

        if (existingAssignments.length >= 5) {
            throw new Error('Nhân viên đã có quá nhiều dịch vụ trong ca này');
        }

        // Tạo assignment mới
        const assignmentData = {
            services_user_id: service_id,
            staff_id: staff_id,
            schedule_id: schedule_id,
            note: note
        };

        return await Repository.create(assignmentData);
    }
};

module.exports = AssignedServicesService; 