const Menu = require('../../models/Menu');
const { successResponse, errorResponse } = require("../../utils/response");

// Get all menus
exports.getAllMenus = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await Menu.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get Lists menu successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Get menu by ID
exports.getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
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
exports.createMenu = async (req, res) => {
    try {
        const menuData = req.body;

        // Tạo mới menu
        const newMenu = await Menu.create(menuData);

        return successResponse(res, { data: newMenu }, 'Menu created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Update menu
exports.updateMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Cập nhật menu
        const updatedMenu = await Menu.updateById(id, updateData);

        if (!updatedMenu) {
            return errorResponse(res, 'Menu not found', 404, 404);
        }

        return successResponse(res, { data: updatedMenu }, 'Menu updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Delete menu
exports.deleteMenu = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa menu
        const isDeleted = await Menu.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Menu not found', 404, 404);
        }

        return successResponse(res, {}, 'Menu deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
