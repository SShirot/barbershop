const express = require('express');
const router = express.Router();
const postController = require('../../controllers/user/postController');
const auth = require('../../middleware/auth');

// Lấy danh sách bài viết
router.get('/', auth, postController.getAllMenus);

module.exports = router;
