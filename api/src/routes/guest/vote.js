const express = require('express');
const router = express.Router();
const voteController = require('../../controllers/guest/voteController');

// Lấy danh sách sản phẩm
router.get('/', voteController.getAll);

module.exports = router;
