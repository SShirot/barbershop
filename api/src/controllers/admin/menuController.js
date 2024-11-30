const MenuService = require('./../../services/admin/menuService');
const { successResponse, errorResponse } = require("../../utils/response");

exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await MenuService.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get Lists menu successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.findById = async (req, res) => {
    try {
        const menu = await MenuService.findById(req.params.id);
        if (!menu) {
            return errorResponse(res, 'Menu not found', 404, 404);
        }

        return successResponse(res, { data: menu }, 'Menu found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Create new menu
exports.create = async (req, res) => {
    try {
        const menuData = req.body;

        // Tạo mới menu
        const newMenu = await MenuService.create(menuData);

        return successResponse(res, { data: newMenu }, 'Menu created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Update menu
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Cập nhật menu
        const updatedMenu = await MenuService.update(id, updateData);

        if (!updatedMenu) {
            return errorResponse(res, 'Menu not found', 404, 404);
        }

        return successResponse(res, { data: updatedMenu }, 'Menu updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa menu
        const isDeleted = await MenuService.delete(id);

        if (!isDeleted) {
            return errorResponse(res, 'Menu not found', 404, 404);
        }

        return successResponse(res, {}, 'Menu deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
