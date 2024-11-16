// src/utils/response.js

/**
 * Function to format response
 * @param {string} status - The status of the response (error, success, etc.)
 * @param {Array|Object} data - The data to send in the response
 * @param {string} message - The message to send in the response
 * @returns {Object} - Formatted response object
 */
const formatResponse = (status, data, message) => {
    return {
        status,
        data,
        message
    };
};

// utils/response.js

const successResponse = (res, data = {}, message = 'successfully', statusCode = 200) => {
    return res.status(statusCode).json({
        status: 'success',
        errorCode: 0,
        message,
        data
    });
};

const errorResponse = (res, message = 'Server error', statusCode = 500, errorCode = 1, data = {}) => {
    return res.status(statusCode).json({
        status: 'error',
        errorCode,
        message,
        data
    });
};

module.exports = { successResponse, errorResponse, formatResponse };
