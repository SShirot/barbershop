const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/auth');
const ratingController = require('../../controllers/user/ratingController');

// API để người dùng gửi đánh giá
router.post('/rate', authenticate, ratingController.rateItem);

// API để kiểm tra xem người dùng đã đánh giá item này chưa
router.get('/check', authenticate, ratingController.checkUserRating);

// API để lấy thông tin đánh giá trung bình hiện tại
router.get('/item-rating', authenticate, ratingController.getItemRating);

module.exports = router;
