const Model = require('../../models/Product');
const {successResponse, errorResponse} = require("../../utils/response");

// Get all
exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await Model.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of data successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Get by ID
exports.getById = async (req, res) => {
    try {
        const product = await Model.findById(req.params.id);
        if (!product) {
            return errorResponse(res, 'Tag not found', 404, 404);
        }

        return successResponse(res, { data: product }, 'data found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Create new
exports.create = async (req, res) => {
    try {

        const productsData = req.body;
        const LabelsIds = req.body.productsLabels || [];
        const variants = req.body.variants || [];

        // Tạo mới
        const newProduct = await Model.create(productsData, LabelsIds, variants);

        return successResponse(res, { data: newProduct }, 'data created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Update
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const LabelsIds = req.body.productsLabels || [];  // Array of tag IDs
        const variants = req.body.variants || [];
        // Cập nhật
        const updatedTag = await Model.updateById(id, updateData, LabelsIds, variants);

        if (!updatedTag) {
            return errorResponse(res, 'Tag not found', 404, 404);
        }

        return successResponse(res, { data: updatedTag }, 'data updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Delete
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa
        const isDeleted = await Model.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'data not found', 404, 404);
        }

        return successResponse(res, {}, 'data deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

