const { validationResult } = require('express-validator');
const formatResponse = require('../utils/response');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(formatResponse('error', [], 'Dữ liệu không hợp lệ', errors.array()));
    }
    next();
};

module.exports = validate;
