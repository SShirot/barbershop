const Repository = require('../../repositories/workScheduleRepository');

const WorkScheduleService = {
    getAll: async (params) => {
        return await Repository.getAll(params);
    },

    findById: async (id) => {
        return await Repository.findById(id);
    },

    create: async (scheduleData) => {
        // Kiểm tra xem nhân viên đã có lịch trong ca đó chưa
        const existingSchedule = await Repository.getAll({
            staff_id: scheduleData.staff_id,
            work_date: scheduleData.work_date,
            shift_id: scheduleData.shift_id
        });

        if (existingSchedule.length > 0) {
            throw new Error('Nhân viên đã có lịch trong ca này');
        }

        return await Repository.create(scheduleData);
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