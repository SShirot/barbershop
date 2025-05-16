const WorkScheduleRepository = require('../../repositories/workScheduleRepository');
const ShiftRepository = require('../../repositories/shiftsRepository');
const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } = require('date-fns');
const { format } = require('date-fns');

const WorkScheduleService = {
    getStaffSchedule: async (staff_id, date, view_type) => {
        try {
            console.log('=== WorkScheduleService.getStaffSchedule Start ===');
            console.log('1. Processing request for date:', date, 'view type:', view_type);

            // Tính toán date range dựa trên view type
            let start_date, end_date;
            const currentDate = new Date(date);

            switch (view_type) {
                case 'day':
                    start_date = startOfDay(currentDate);
                    end_date = endOfDay(currentDate);
                    break;
                case 'week':
                    start_date = startOfWeek(currentDate, { weekStartsOn: 1 }); // Thứ 2
                    end_date = endOfWeek(currentDate, { weekStartsOn: 1 }); // Chủ nhật
                    break;
                case 'month':
                    start_date = startOfMonth(currentDate);
                    end_date = endOfMonth(currentDate);
                    break;
                default:
                    start_date = startOfDay(currentDate);
                    end_date = endOfDay(currentDate);
            }

            console.log('2. Date range:', {
                start: format(start_date, 'yyyy-MM-dd'),
                end: format(end_date, 'yyyy-MM-dd')
            });

            // Lấy lịch làm việc của staff cụ thể
            const schedules = await WorkScheduleRepository.getAll({
                staff_id,
                start_date: format(start_date, 'yyyy-MM-dd'),
                end_date: format(end_date, 'yyyy-MM-dd')
            });

            console.log('3. Found schedules count:', schedules.length);

            // Format dữ liệu theo view type
            const formattedSchedules = schedules.map(schedule => ({
                id: schedule.id,
                title: `Ca: ${schedule.shift_name || 'Chưa có tên'}`,
                start: new Date(`${schedule.work_date}T${schedule.start_time}`),
                end: new Date(`${schedule.work_date}T${schedule.end_time}`),
                staff_name: schedule.staff_name || 'Chưa có tên',
                shift_name: schedule.shift_name || 'Sáng',
                status: schedule.status || 'pending',
                allDay: false,
                resource: {
                    staff_id: schedule.staff_id,
                    shift_id: schedule.shift_id
                },
                work_date: schedule.work_date,
                start_time: schedule.start_time,
                end_time: schedule.end_time
            }));

            return formattedSchedules;
        } catch (error) {
            console.error('Error in getStaffSchedule:', error);
            throw error;
        }
    },

    registerSchedule: async (scheduleData) => {
        try {
            console.log('=== WorkScheduleService.registerSchedule Start ===');
            console.log('1. Received schedule data:', scheduleData);

            // Kiểm tra xem nhân viên đã có lịch trong ca đó chưa
            const existingSchedule = await WorkScheduleRepository.getAll({
                staff_id: scheduleData.staff_id,
                work_date: scheduleData.work_date,
                shift_id: scheduleData.shift_id
            });

            if (existingSchedule.length > 0) {
                console.log('2. Schedule already exists');
                throw new Error('Bạn đã đăng ký ca làm việc này');
            }

            // Kiểm tra xem ca làm việc có tồn tại không
            const shift = await ShiftRepository.findById(scheduleData.shift_id);
            if (!shift) {
                console.log('2. Shift not found');
                throw new Error('Ca làm việc không tồn tại');
            }

            console.log('3. Creating new schedule');
            const result = await WorkScheduleRepository.create(scheduleData);
            console.log('4. Created schedule:', result);

            return result;
        } catch (error) {
            console.error('Error in registerSchedule:', error);
            throw error;
        }
    },

    getAvailableShifts: async (date) => {
        try {
            console.log('=== WorkScheduleService.getAvailableShifts Start ===');
            console.log('1. Received date:', date);

            // Lấy tất cả ca làm việc
            const allShifts = await ShiftRepository.getAll();
            console.log('2. All shifts:', allShifts);
            
            // Lấy các ca đã được đăng ký trong ngày
            const registeredShifts = await WorkScheduleRepository.getAll({
                work_date: date
            });
            console.log('3. Registered shifts:', registeredShifts);

            // Lọc ra các ca còn trống
            const availableShifts = allShifts.filter(shift => {
                return !registeredShifts.some(regShift => regShift.shift_id === shift.id);
            });
            console.log('4. Available shifts:', availableShifts);

            return availableShifts;
        } catch (error) {
            console.error('Error in getAvailableShifts:', error);
            throw error;
        }
    },

    getScheduleDetails: async (schedule_id, staff_id) => {
        try {
            console.log('=== WorkScheduleService.getScheduleDetails Start ===');
            console.log('1. Received params:', { schedule_id, staff_id });

            const schedule = await WorkScheduleRepository.findById(schedule_id);
            console.log('2. Found schedule:', schedule);
            
            if (!schedule) {
                console.log('3. Schedule not found');
                throw new Error('Schedule not found');
            }

            // Kiểm tra xem schedule có thuộc về staff này không
            if (schedule.staff_id !== staff_id) {
                console.log('3. Unauthorized access');
                throw new Error('Unauthorized: This schedule does not belong to you');
            }

            return schedule;
        } catch (error) {
            console.error('Error in getScheduleDetails:', error);
            throw error;
        }
    },

    cancelSchedule: async (schedule_id, staff_id) => {
        try {
            console.log('=== WorkScheduleService.cancelSchedule Start ===');
            console.log('1. Received params:', { schedule_id, staff_id });

            const schedule = await WorkScheduleRepository.findById(schedule_id);
            console.log('2. Found schedule:', schedule);
            
            if (!schedule) {
                console.log('3. Schedule not found');
                throw new Error('Schedule not found');
            }

            // Kiểm tra xem schedule có thuộc về staff này không
            if (schedule.staff_id !== staff_id) {
                console.log('3. Unauthorized access');
                throw new Error('Unauthorized: This schedule does not belong to you');
            }

            // Chỉ cho phép hủy nếu status là pending
            if (schedule.status !== 'pending') {
                console.log('3. Invalid status for cancellation');
                throw new Error('Cannot cancel schedule: Status is not pending');
            }

            console.log('4. Deleting schedule');
            const result = await WorkScheduleRepository.delete(schedule_id);
            console.log('5. Deletion result:', result);

            return result;
        } catch (error) {
            console.error('Error in cancelSchedule:', error);
            throw error;
        }
    }
};

module.exports = WorkScheduleService; 