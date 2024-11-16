const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { successResponse, errorResponse } = require('../utils/response');

// Middleware xác thực token
module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return errorResponse(res, 'No token, authorization denied', 401, 1);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        return errorResponse(res, 'Token is not valid', 403, 1);
    }
};

// Middleware xác thực dữ liệu
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Dữ liệu không hợp lệ', 400, 1, errors.array());
    }
    next();
};

module.exports.validate = validate;
