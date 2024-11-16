const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/categoryController');
const auth = require('../../middleware/auth');

// Lấy danh sách category
router.get('/', auth, categoryController.getAllCategories);

// Lấy chi tiết category theo ID
router.get('/:id', auth, categoryController.getCategoryById);

// Tạo category mới
router.post('/', auth, categoryController.createCategory);

// Cập nhật category
router.put('/:id', auth, categoryController.updateCategory);

// Xóa category
router.delete('/:id', auth, categoryController.deleteCategory);

module.exports = router;
