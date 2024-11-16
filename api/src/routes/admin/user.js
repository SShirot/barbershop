const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validation');
const userController = require('../../controllers/admin/userController');

/**
 * @swagger
 * tags:
 *   name: Account Services
 *   description: Pet care service management
 */

router.get('/', auth, userController.getAllUsers);
router.post(
    '/',
    userController.createUser
);
router.get('/:id', auth, userController.getUserById);
router.put(
    '/:id',
    userController.updateUser
);

router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
