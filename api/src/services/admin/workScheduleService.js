const Repository = require('../../repositories/workScheduleRepository');
const ShiftRepository = require('../../repositories/shiftsRepository');

const WorkScheduleService = {
    getAll: async (params) => {
        return await Repository.getAll(params);
    },

    findById: async (id) => {
        return await Repository.findById(id);
    },

    create: async (scheduleData) => {
        try {
            console.log('=== WorkScheduleService.create Start ===');
            console.log('1. Received schedule data:', scheduleData);

            // Lấy thông tin ca làm việc mới
            const newShift = await ShiftRepository.findById(scheduleData.shift_id);
            if (!newShift) {
                throw new Error('Ca làm việc không tồn tại');
            }

            // Lấy tất cả lịch làm việc của nhân viên trong ngày đó
            const existingSchedules = await Repository.getAll({
                staff_id: scheduleData.staff_id,
                work_date: scheduleData.work_date
            });

            console.log('2. Existing schedules:', existingSchedules.length);

            // Kiểm tra xem có bị chồng chéo thời gian không
            for (const existingSchedule of existingSchedules) {
                const existingShift = await ShiftRepository.findById(existingSchedule.shift_id);
                
                // Kiểm tra chồng chéo thời gian
                if (
                    (newShift.start_time <= existingShift.end_time && 
                     newShift.end_time >= existingShift.start_time)
                ) {
                    throw new Error('Nhân viên đã có lịch làm việc chồng chéo thời gian');
                }
            }

            console.log('3. No time overlap found, creating new schedule');
            const result = await Repository.create(scheduleData);
            console.log('4. Created schedule:', result);

            return result;
        } catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    },

    update: async (id, scheduleData) => {
        return await Repository.update(id, scheduleData);
    },

    delete: async (id) => {
        return await Repository.delete(id);
    },

    getAvailableStaff: async (work_date, shift_id) => {
        return await Repository.getAvailableStaff(work_date, shift_id);
    }
};

module.exports = WorkScheduleService; 