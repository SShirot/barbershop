const express = require('express');
const router = express.Router();
const postController = require('../../controllers/user/postController');
const auth = require('../../middleware/auth');

// Lấy danh sách bài viết
router.get('/', auth, postController.getAllPosts);

// Lấy chi tiết bài viết theo ID
router.get('/:id', auth, postController.getPostById);

// Tạo bài viết mới
router.post('/', auth, postController.createPost);

// Cập nhật bài viết
router.put('/:id', auth, postController.updatePost);

// Xóa bài viết
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
