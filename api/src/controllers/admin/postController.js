const Article = require('../../models/Post');
const { successResponse, errorResponse } = require("../../utils/response");

// Get all articles
exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await Article.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of articles successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Get article by ID
exports.getById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return errorResponse(res, 'Article not found', 404, 404);
        }

        return successResponse(res, { data: article }, 'Article found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Create new article
exports.create = async (req, res) => {
    try {
        const articleData = req.body;
        const tagIds = req.body.tags || [];  // Array of tag IDs

        // Tạo mới bài viết cùng với tags
        const newArticle = await Article.create(articleData, tagIds);

        return successResponse(res, { data: newArticle }, 'Article created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Update article
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const tagIds = req.body.tags || [];  // Array of tag IDs

        // Cập nhật bài viết cùng với tags
        const updatedArticle = await Article.updateById(id, updateData, tagIds);

        if (!updatedArticle) {
            return errorResponse(res, 'Article not found', 404, 404);
        }

        return successResponse(res, { data: updatedArticle }, 'Article updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Delete article
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa bài viết
        const isDeleted = await Article.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Article not found', 404, 404);
        }

        return successResponse(res, {}, 'Article deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
