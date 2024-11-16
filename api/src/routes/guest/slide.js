const express = require('express');
const router = express.Router();
const slideController = require('../../controllers/guest/slideController');

// Lấy danh sách sản phẩm
router.get('/', slideController.getAll);
router.get('/show/:id', slideController.findById);

module.exports = router;
