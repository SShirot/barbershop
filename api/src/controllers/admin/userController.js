const User = require('../../models/User');
const formatResponse = require("../../utils/response");
const bcrypt = require("bcryptjs");
const {successResponse, errorResponse} = require("../../utils/response");
const { validationResult } = require('express-validator');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const { page, page_size: pageSize, name } = req.query;
        const result = await User.getAll(Number(page), Number(pageSize), name);

        return successResponse(res, { meta: result.meta, data: result.data }, 'Get Lists successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
};

// Find by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOneById(req.params.id);
        if (!user) {
            return errorResponse(res, 'Data not found', 404, 404);
        }

        return successResponse(res, {data: tag}, 'Data found successfully');
    } catch (err) {
        console.error(err);
        return errorResponse(res);
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, avatar, phone } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne(email);
        if (!user) {
            return errorResponse(res, 'User not found', 404);
        }

        // Hash new password if provided
        let updatedData = { name, email, avatar, phone };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

        // Update user
        const isUpdated = await User.update(id, updatedData);
        if (!isUpdated) {
            return errorResponse(res, 'Failed to update user', 400);
        }

        successResponse(res, { id, ...updatedData }, 'User updated successfully', 200);
    } catch (err) {
        console.error(err.message);
        errorResponse(res, 'Server error', 500);
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, 'Invalid data', 400, 1, errors.array());
    }

    const { name, email, password, avatar = 'https://via.placeholder.com/150' } = req.body;

    try {
        // Check if the user already exists by email
        let existingUser = await User.findOne(email);
        if (existingUser) {
            return errorResponse(res, 'User already exists', 400);
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user in the database
        const newUser = {
            name,
            email,
            password: hashedPassword,
            avatar
        };

        const userId = await User.create(newUser);

        // Return success response with user data
        successResponse(res, {
            user: {
                id: userId,
                name,
                email,
                avatar
            }
        }, 'User created successfully', 201);
    } catch (err) {
        console.error(err.message);
        errorResponse(res, 'Server error', 500);
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if user exists
        let user = await User.findOneById(id);
        if (!user) {
            return errorResponse(res, 'User not found', 404);
        }

        // Delete user
        const isDeleted = await User.delete(id);
        if (!isDeleted) {
            return errorResponse(res, 'Failed to delete user', 400);
        }

        successResponse(res, {}, 'User deleted successfully', 200);
    } catch (err) {
        console.error(err.message);
        errorResponse(res, 'Server error', 500);
    }
};

