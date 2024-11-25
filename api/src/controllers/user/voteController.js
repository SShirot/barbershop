const Vote = require('../../models/Vote');
const { successResponse, errorResponse } = require("../../utils/response");

// Get all votes
exports.getAll = async (req, res) => {
    try {
        const { page, page_size: pageSize, product_id: productId, user_id: userId } = req.query;
        const result = await Vote.getAll(Number(page), Number(pageSize), productId, userId);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of votes successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Get vote by ID
exports.getById = async (req, res) => {
    try {
        const vote = await Vote.findById(req.params.id);
        if (!vote) {
            return errorResponse(res, 'Vote not found', 404, 404);
        }

        return successResponse(res, { data: vote }, 'Vote found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Create new vote
exports.create = async (req, res) => {
    try {
        const voteData = req.body;
        const userId = req.user.id;
        // Tạo mới vote
        const newData = {
            ...voteData,
            user_id: userId
        }
        console.info("===========[] ===========[newData] : ",newData);
        const newVote = await Vote.create(newData);
        // Kiểm tra kết quả trả về, nếu đã đánh giá rồi thì trả về lỗi cho người dùng
        if (newVote && newVote.status === 'already_reviewed') {
            return errorResponse(res, 'Tài khoản đã đánh giá sản phẩm', 400, 400);
        }
        return successResponse(res, { data: newVote }, 'Vote created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Update vote
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Cập nhật vote
        const updatedVote = await Vote.updateById(id, updateData);

        if (!updatedVote) {
            return errorResponse(res, 'Vote not found', 404, 404);
        }

        return successResponse(res, { data: updatedVote }, 'Vote updated successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Delete vote
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        // Xóa vote
        const isDeleted = await Vote.deleteById(id);

        if (!isDeleted) {
            return errorResponse(res, 'Vote not found', 404, 404);
        }

        return successResponse(res, {}, 'Vote deleted successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
