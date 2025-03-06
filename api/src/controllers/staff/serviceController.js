const Service = require('../../models/Service');
const ServiceUser = require('../../models/ServiceUser');
const { successResponse, errorResponse } = require("../../utils/response");

// Get all menus
exports.getAllServices = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await Service.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get Lists menu successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
        
exports.getAllServicesRegister = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await ServiceUser.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get Lists menu successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Get menu by ID
exports.getServiceById = async (req, res) => {
    try {
        const menu = await Service.findById(req.params.id);
        if (!menu) {
            return errorResponse(res, 'Service not found', 404, 404);
        }

        return successResponse(res, { data: menu }, 'Service found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Create new menu
exports.createService = async (req, res) => {
    try {
        const menuData = req.body;

        // Tạo mới menu
        const newService = await Service.create(menuData);

        return successResponse(res, { data: newService }, 'Service created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Update menu
exports.updateService = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Cập nhật menu
        const updatedService = await Service.updateById(id, updateData);

        if (!updatedService) {
            return errorResponse(res, 'Service not found', 404, 404);
        }

        return successResponse(res, { data: updatedService }, 'Service updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Delete menu
exports.deleteService = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa menu
        const isDeleted = await Service.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Service not found', 404, 404);
        }

        return successResponse(res, {}, 'Service deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.deleteServiceUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa menu
        const isDeleted = await ServiceUser.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Service not found', 404, 404);
        }

        return successResponse(res, {}, 'Service deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
