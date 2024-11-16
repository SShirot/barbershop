const Category = require('../../models/Category');
const formatResponse = require("../../utils/response");
const {successResponse, errorResponse} = require("../../utils/response");

// Lấy danh sách category
exports.getAllCategories = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await Category.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Lấy chi tiết category theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return errorResponse(res, 'Category not found', 404, 404);
        }

        return successResponse(res, { data: category });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Tạo category mới
exports.createCategory = async (req, res) => {
    try {
        const categoryData = req.body;

        // Tạo mới category
        const newCategory = await Category.create(categoryData);

        return successResponse(res, { data: newCategory }, 'successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Cập nhật category
exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Cập nhật category
        const updatedCategory = await Category.updateById(id, updateData);

        if (!updatedCategory) {
            return errorResponse(res, 'Category not found', 404, 404);
        }

        return successResponse(res, { data: updatedCategory });
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Xóa category
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        console.info("===========[deleteCategory] ===========[id] : ",id);
        // Xóa category
        const isDeleted = await Category.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Category not found', 404, 404);
        }

        return successResponse(res);
    } catch (err) {
        console.error("deleteCategory", err);
        return errorResponse(res);
    }
};
