const Product = require('../../models/Product');
const formatResponse = require("../../utils/response");
const Model = require("../../models/Product");
const ProductLabel = require("../../models/ProductLabel");
const {successResponse, errorResponse} = require("../../utils/response");

// Lấy danh sách sản phẩm
exports.getListsProduct = async (req, res) => {
    try {
        const { page = 1, page_size: pageSize = 10, name, category_id, sort, rating, label_id } = req.query;
        const result = await Model.getAll(Number(page), Number(pageSize), name, category_id, sort, rating, label_id);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of data successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.getListsProductLabel = async (req, res) => {
    try {
        const { page = 1, page_size: pageSize = 10, name, category_id, sort, rating } = req.query;
        const result = await ProductLabel.getAll(Number(page), Number(pageSize), name, category_id, sort, rating);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of data successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.showProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return errorResponse(res, 'Product not found', 404, 404);
        }

        return successResponse(res, { data: product }, 'data found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.showDashboardVoteDetail = async (req, res) => {
    try {
        const vote = await Product.showDashboardVoteDetail(req.params.id);
        if (!vote) {
            return errorResponse(res, 'Vote not found', 404, 404);
        }

        return successResponse(res, { data: vote }, 'data found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
