const Repository = require('../../repositories/assignedServicesRepository');
const WorkScheduleRepository = require('../../repositories/workScheduleRepository');
const ServiceUserRepository = require('../../models/ServiceUser');
const db = require('../../config/dbMysql');

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
            schedule_id: assignmentData.schedule_id,
            status: 'assigned' // Chỉ đếm các dịch vụ đã được phân công
        });

        if (existingAssignments.length >= 5) { // Giới hạn 5 dịch vụ mỗi ca
            throw new Error('Nhân viên đã có quá nhiều dịch vụ trong ca này');
        }

        // Thêm status mặc định là pending
        assignmentData.status = 'pending';
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
            WHERE (as.id IS NULL OR as.status = 'pending')
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
        // Lấy các khung giờ của nhân viên và số lượng task đã được gán
        const query = `
            SELECT 
                ws.*,
                s.name as shift_name,
                s.start_time,
                s.end_time,
                COUNT(ass.id) as assigned_count
            FROM work_schedule ws
            JOIN shifts s ON ws.shift_id = s.id
            LEFT JOIN assigned_services ass ON ws.id = ass.schedule_id
            WHERE ws.staff_id = ? 
            AND ws.work_date = ?
            AND ws.status = 'approved'
            GROUP BY ws.id, s.name, s.start_time, s.end_time
            HAVING assigned_count < 5
            ORDER BY s.start_time ASC
        `;
        const [rows] = await db.query(query, [staff_id, date]);
        return rows;
    },

    getAvailableStaff: async (date) => {
        try {
            console.log('=== getAvailableStaff Service Start ===');
            console.log('1. Input date:', date);
            
            // Lấy danh sách nhân viên có lịch được duyệt trong ngày và chưa đạt giới hạn dịch vụ
            const query = `
                SELECT DISTINCT u.*, 
                       COUNT(ass.id) as assigned_count
                FROM users u
                JOIN work_schedule ws ON u.id = ws.staff_id
                JOIN shifts s ON ws.shift_id = s.id
                LEFT JOIN assigned_services ass ON u.id = ass.staff_id 
                    AND ass.schedule_id = ws.id 
                    AND ass.status = 'assigned'
                WHERE u.role = 'staff'
                AND ws.work_date = ?
                AND ws.status = 'approved'
                GROUP BY u.id
                HAVING assigned_count < 5
                ORDER BY assigned_count ASC
            `;
            console.log('2. Query:', query);
            console.log('3. Query params:', [date]);
            
            const [rows] = await db.query(query, [date]);
            console.log('4. Query result:', rows);
            
            return rows;
        } catch (err) {
            console.error('Error in getAvailableStaff:', err);
            throw err;
        }
    },

    registerService: async (serviceData) => {
        // Tạo yêu cầu dịch vụ mới
        const serviceUserData = {
            user_id: serviceData.user_id,
            staff_id: serviceData.staff_id,
            service_id: serviceData.service_id,
            price: serviceData.price,
            status: 'pending',
            name: serviceData.name,
            address: serviceData.address,
            date: serviceData.date,
            time: serviceData.time,
            is_home_service: serviceData.is_home_service,
            note: serviceData.note
        };

        const serviceUser = await ServiceUserRepository.create(serviceUserData);
        return serviceUser;
    },

    approveService: async (id, staffId = null) => {
        // Cập nhật trạng thái dịch vụ thành approved
        const serviceUser = await ServiceUserRepository.findById(id);
        if (!serviceUser) {
            throw new Error('Không tìm thấy yêu cầu dịch vụ');
        }

        const updatedService = await ServiceUserRepository.updateById(id, {
            ...serviceUser,
            staff_id: staffId ?? serviceUser.staff_id,
            status: 'processing'
        });

        return updatedService;
    },

    rejectService: async (id) => {
        // Cập nhật trạng thái dịch vụ thành rejected
        const serviceUser = await ServiceUserRepository.findById(id);
        if (!serviceUser) {
            throw new Error('Không tìm thấy yêu cầu dịch vụ');
        }

        const updatedService = await ServiceUserRepository.updateById(id, {
            ...serviceUser,
            status: 'canceled'
        });

        return updatedService;
    },

    completeService: async (id) => {
        // Cập nhật trạng thái dịch vụ thành completed
        const serviceUser = await ServiceUserRepository.findById(id);
        if (!serviceUser) {
            throw new Error('Không tìm thấy yêu cầu dịch vụ');
        }

        const updatedService = await ServiceUserRepository.updateById(id, {
            ...serviceUser,
            status: 'completed'
        });
        return updatedService;
    },
    // Thêm hàm mới để cập nhật trạng thái
    updateStatus: async (id, status) => {
        const validStatuses = ['pending', 'assigned', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new Error('Trạng thái không hợp lệ');
        }

        const assignment = await Repository.findById(id);
        if (!assignment) {
            throw new Error('Không tìm thấy phân công dịch vụ');
        }

        // Nếu chuyển sang trạng thái assigned, kiểm tra số lượng dịch vụ
        if (status === 'assigned') {
            const existingAssignments = await Repository.getAll({
                staff_id: assignment.staff_id,
                schedule_id: assignment.schedule_id,
                status: 'assigned'
            });

            if (existingAssignments.length >= 5) {
                throw new Error('Nhân viên đã có quá nhiều dịch vụ trong ca này');
            }
        }

        return await Repository.update(id, { status });
    },
    findAllWithDetails: async () => {
        return await ServiceUserRepository.findAllWithDetails();
    },

    assignService: async (service_id, staff_id, schedule_id, note) => {
        return await Repository.assignService(service_id, staff_id, schedule_id, note);
    }
};

module.exports = AssignedServicesService; 