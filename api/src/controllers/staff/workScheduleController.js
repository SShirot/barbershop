const WorkScheduleService = require('../../services/staff/workScheduleService');
const { successResponse, errorResponse } = require("../../utils/response");

// Middleware kiểm tra quyền staff
const checkStaffRole = (req, res, next) => {
    if (req.user && req.user.role === 'staff') {
        next();
    } else {
        return errorResponse(res, 'Unauthorized: Staff access required');
    }
};

exports.getStaffSchedule = async (req, res) => {
    try {
        console.log('=== getStaffSchedule Controller Start ===');
        console.log('1. Request query:', req.query);
        const { view_type, date } = req.query;
        const staff_id = req.user.id; // Lấy ID từ token đã verify
        
        if (!date) {
            console.log('2. Missing required parameters');
            return errorResponse(res, 'Date is required');
        }

        console.log('3. Fetching staff schedule with params:', { staff_id, date, view_type });
        const data = await WorkScheduleService.getStaffSchedule(staff_id, date, view_type);
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

exports.registerSchedule = async (req, res) => {
    try {
        console.log('=== registerSchedule Controller Start ===');
        console.log('1. Request body:', req.body);
        
        const { work_date, shift_id } = req.body;
        const staff_id = req.user.id; // Lấy ID từ token đã verify

        if (!work_date || !shift_id) {
            console.log('2. Missing required parameters');
            return errorResponse(res, 'Work date and shift ID are required');
        }

        console.log('3. Registering schedule with params:', { staff_id, work_date, shift_id });
        const data = await WorkScheduleService.registerSchedule({
            staff_id,
            work_date,
            shift_id,
            status: 'pending'
        });
        console.log('4. Registration result:', data);

        return successResponse(res, { data }, 'Schedule registered successfully');
    } catch (err) {
        console.error('Error in registerSchedule:', err);
        return errorResponse(res, err.message);
    }
};

exports.getAvailableShifts = async (req, res) => {
    try {
        console.log('=== getAvailableShifts Controller Start ===');
        console.log('1. Request query:', req.query);
        
        const { date } = req.query;
        const staff_id = req.user.id; // Lấy ID từ token đã verify

        if (!date) {
            console.log('2. Missing required parameters');
            return errorResponse(res, 'Date is required');
        }

        console.log('3. Fetching available shifts for date:', date);
        const data = await WorkScheduleService.getAvailableShifts(date, staff_id);
        console.log('4. Found available shifts:', data);

        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error('Error in getAvailableShifts:', err);
        return errorResponse(res);
    }
};

exports.getScheduleDetails = async (req, res) => {
    try {
        console.log('=== getScheduleDetails Controller Start ===');
        console.log('1. Request params:', req.params);
        
        const { schedule_id } = req.params;
        const staff_id = req.user.id; // Lấy ID từ token đã verify

        console.log('2. Fetching schedule details:', { schedule_id, staff_id });
        const data = await WorkScheduleService.getScheduleDetails(schedule_id, staff_id);
        console.log('3. Found schedule details:', data);

        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error('Error in getScheduleDetails:', err);
        return errorResponse(res);
    }
};

exports.cancelSchedule = async (req, res) => {
    try {
        console.log('=== cancelSchedule Controller Start ===');
        console.log('1. Request params:', req.params);
        
        const { schedule_id } = req.params;
        const staff_id = req.user.id; // Lấy ID từ token đã verify

        console.log('2. Cancelling schedule:', { schedule_id, staff_id });
        const data = await WorkScheduleService.cancelSchedule(schedule_id, staff_id);
        console.log('3. Cancellation result:', data);

        return successResponse(res, { data }, 'Schedule cancelled successfully');
    } catch (err) {
        console.error('Error in cancelSchedule:', err);
        return errorResponse(res, err.message);
    }
}; 