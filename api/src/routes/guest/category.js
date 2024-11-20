const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/guest/categoryController');

// Lấy danh sách sản phẩm
router.get('/', categoryController.getAllCategories);
router.get('/show/:id', categoryController.getCategoryById);

module.exports = router;
