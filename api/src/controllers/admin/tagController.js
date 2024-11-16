const Tag = require('../../models/Tag');
const { successResponse, errorResponse } = require("../../utils/response");

// Get all tags
exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await Tag.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of tags successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Get tag by ID
exports.getById = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return errorResponse(res, 'Tag not found', 404, 404);
        }

        return successResponse(res, { data: tag }, 'Tag found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Create new tag
exports.create = async (req, res) => {
    try {
        const tagData = req.body;

        // Tạo mới tag
        const newTag = await Tag.create(tagData);

        return successResponse(res, { data: newTag }, 'Tag created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Update tag
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Cập nhật tag
        const updatedTag = await Tag.updateById(id, updateData);

        if (!updatedTag) {
            return errorResponse(res, 'Tag not found', 404, 404);
        }

        return successResponse(res, { data: updatedTag }, 'Tag updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Delete tag
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa tag
        const isDeleted = await Tag.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Tag not found', 404, 404);
        }

        return successResponse(res, {}, 'Tag deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
