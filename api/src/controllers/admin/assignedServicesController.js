const AssignedServicesService = require('../../services/admin/assignedServicesService');
const { successResponse, errorResponse } = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const data = await AssignedServicesService.getAll(req.query);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.findById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await AssignedServicesService.findById(id);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.create = async (req, res) => {
    try {
        const assignmentData = req.body;
        const data = await AssignedServicesService.create(assignmentData);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, err.message);
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const assignmentData = req.body;
        const data = await AssignedServicesService.update(id, assignmentData);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await AssignedServicesService.delete(id);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getStaffAssignments = async (req, res) => {
    try {
        const { staff_id, date } = req.query;
        const data = await AssignedServicesService.getStaffAssignments(staff_id, date);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getUnassignedServices = async (req, res) => {
    try {
        const data = await AssignedServicesService.getUnassignedServices();
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getStaffSchedule = async (req, res) => {
    try {
        const { staff_id, date } = req.query;
        const data = await AssignedServicesService.getStaffSchedule(staff_id, date);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getStaffAvailableSlots = async (req, res) => {
    try {
        const { staff_id, date } = req.query;
        const data = await AssignedServicesService.getStaffAvailableSlots(staff_id, date);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getAvailableStaff = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return errorResponse(res, 'Date is required');
        }
        const data = await AssignedServicesService.getAvailableStaff(date);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.registerService = async (req, res) => {
    try {
        const serviceData = req.body;
        const data = await AssignedServicesService.registerService(serviceData);
        return successResponse(res, { data }, 'Service request registered successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, err.message);
    }
};

exports.approveService = async (req, res) => {
    try {
        const { id } = req.params;
        const { staff_id } = req.body;
        const data = await AssignedServicesService.approveService(id, staff_id);
        return successResponse(res, { data }, 'Service request approved successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, err.message);
    }
};

exports.rejectService = async (req, res) => {
    try {
        const { id } = req.params;
        const { staff_id } = req.body;
        const data = await AssignedServicesService.rejectService(id, staff_id);
        return successResponse(res, { data }, 'Service request rejected successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, err.message);
    }
};

exports.completeService = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await AssignedServicesService.completeService(id);
        return successResponse(res, { data }, 'Service request completed successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, err.message);
    }
};

exports.assignService = async (req, res) => {
    try {
        const { service_id, staff_id, schedule_id, note } = req.body;
        const data = await AssignedServicesService.assignService(service_id, staff_id, schedule_id, note);
        return successResponse(res, { data }, 'Successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res, err.message);
    }
}; 
exports.findAllWithDetails = async (req, res) => {
    try {

        const data = await AssignedServicesService.findAllWithDetails();
        console.log('Service users data:', data);
        return successResponse(res, { data }, 'Successfullyyyy ');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};