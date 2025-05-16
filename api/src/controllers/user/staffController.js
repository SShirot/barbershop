const UserRepository = require('../../models/User');
const { successResponse, errorResponse } = require('../../utils/response');

const StaffController = {
    getStaffList: async (req, res) => {
        try {
            console.log('=== StaffController.getStaffList Start ===');
            
            // Lấy danh sách staff (role = 'staff')
            const staffs = await UserRepository.getStaffList({
                role: 'staff',
                is_active: true
            });

            // Format dữ liệu trả về
            const formattedStaffs = staffs.map(staff => ({
                id: staff.id,
                name: staff.name,
                email: staff.email,
                phone: staff.phone,
                experience: staff.experience || 0,
                rating: staff.rating || 0,
                avatar: staff.avatar,
                description: staff.description
            }));

            console.log('Found staffs:', formattedStaffs.length);
            return successResponse(res, formattedStaffs);
        } catch (error) {
            console.error('Error in getStaffList:', error);
            return errorResponse(res, error.message);
        }
    },
    getStaffListByDate: async (req, res) => {
        try {
            console.log('=== StaffController.getStaffList Start ===');
            const { date, time } = req.query;
            const staffs = await UserRepository.getStaffListByDate({
                role: 'staff',
                is_active: true,
                date,
                time
            });
            const formattedStaffs = staffs.map(staff => ({
                id: staff.staff_id,
                name: staff.staff_name,
                shift: staff.shift_name,
                startTime: staff.start_time,
                endTime: staff.end_time,
                assignedCount: staff.assigned_count || 0
            }));
            console.log('Found staffs:', formattedStaffs.length);
            return successResponse(res, formattedStaffs);
        } catch (error) {
            console.error('Error in getStaffListByDate:', error);
            return errorResponse(res, error.message);
        }
    }
};

module.exports = StaffController; 