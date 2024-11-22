const Model = require("../../models/Order");
const {successResponse, errorResponse} = require("../../utils/response");

exports.createOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await Model.create(orderData);

        return successResponse(res, { data: newOrder }, 'Order created successfully', 201);
    } catch (err) {
        console.error(err);
        return errorResponse(res, 'Server error');
    }
};
