const Product = require('../../models/Product');
const formatResponse = require("../../utils/response");
const Model = require("../../models/Product");
const {successResponse, errorResponse} = require("../../utils/response");

// Lấy danh sách sản phẩm
exports.getListsProduct = async (req, res) => {
    try {
        const { page = 1, page_size: pageSize = 10, name } = req.query;
        const result = await Model.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get list of data successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

exports.showProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        return successResponse(res, { data: product}, 'Get list of data successfully');

    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};
