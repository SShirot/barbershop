const WorkScheduleService = require('../../services/admin/workScheduleService');
const User = require('../../models/User');
const { successResponse, errorResponse } = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        console.log('Getting work schedules with params:', req.query);
        const data = await WorkScheduleService.getAll(req.query);
        console.log('Work schedules data:', data);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error('Error in getAll:', err);
        return errorResponse(res);
    }
};

exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await WorkScheduleService.findById(id);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.create = async (req, res) => {
    try {
        const scheduleData = req.body;
        const data = await WorkScheduleService.create(scheduleData);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const scheduleData = req.body;
        const data = await WorkScheduleService.update(id, scheduleData);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await WorkScheduleService.delete(id);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getAvailableStaff = async (req, res) => {
    try {
        const { work_date, shift_id } = req.query;
        const data = await WorkScheduleService.getAvailableStaff(work_date, shift_id);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.approve = async (req, res) => {
    try {
        console.log('=== Backend - Approve Request ===');
        console.log('1. Controller - Received approve request for ID:', req.params.id);
        
        const { id } = req.params;
        
        // First get the current schedule
        const currentSchedule = await WorkScheduleService.findById(id);
        console.log('2. Controller - Current schedule:', currentSchedule);
        
        if (!currentSchedule) {
            throw new Error('Schedule not found');
        }
        
        // Only update the status field
        const updateData = {
            status: 'approved'
        };
        console.log('3. Controller - Update data:', updateData);
        
        const data = await WorkScheduleService.update(id, updateData);
        console.log('4. Controller - Update result:', data);
        
        return successResponse(res, { data }, 'Successfully approved');
    } catch (err) {
        console.error('5. Controller - Error in approve:', err);
        console.error('Error details:', {
            message: err.message,
            stack: err.stack
        });
        return errorResponse(res, err.message);
    }
};

exports.reject = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Rejecting work schedule:', id);
        const data = await WorkScheduleService.update(id, { status: 'rejected' });
        console.log('Reject result:', data);
        return successResponse(res, { data }, 'Successfully rejected');
    } catch (err) {
        console.error('Error in reject:', err);
        return errorResponse(res);
    }
};

exports.getStaffSchedule = async (req, res) => {
    try {
        console.log('=== getStaffSchedule Controller Start ===');
        console.log('1. Request query:', req.query);
        const { staff_id, start_date, end_date } = req.query;
        
        if (!staff_id || !start_date || !end_date) {
            console.log('2. Missing required parameters');
            return errorResponse(res, 'Staff ID and date range are required');
        }

        console.log('3. Fetching staff schedule with params:', { staff_id, start_date, end_date });
        const data = await WorkScheduleService.getAll({
            staff_id,
            start_date,
            end_date
        });
        console.log('4. Found schedules:', data);

        // Ensure we always return an array
        const schedules = Array.isArray(data) ? data : [];
        console.log('5. Formatted response:', { data: schedules });
        
        return successResponse(res, { data: schedules }, 'Successfully');
    } catch (err) {
        console.error('Error in getStaffSchedule:', err);
        console.error('Error stack:', err.stack);
        return errorResponse(res);
    }
};

exports.getStaffList = async (req, res) => {
    try {
        console.log('=== getStaffList Controller Start ===');
        console.log('1. Request received from client');
        console.log('2. Calling User.getStaffList()...');
        const data = await User.getStaffList();
        console.log('3. Raw data from User.getStaffList():', data);
        console.log('4. Data type:', typeof data);
        console.log('5. Is Array?', Array.isArray(data));
        console.log('6. Data length:', data?.length);
        
        const response = successResponse(res, { data }, 'Successfully');
        console.log('7. Final response:', response);
        console.log('=== getStaffList Controller End ===');
        return response;
    } catch (err) {
        console.error('Error in getStaffList:', err);
        console.error('Error stack:', err.stack);
        return errorResponse(res);
    }
}; 