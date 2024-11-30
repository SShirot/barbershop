const express = require('express');
const router = express.Router();
const brandController = require('../../controllers/guest/brandController');

// Lấy danh sách sản phẩm
router.get('/', brandController.getAll);

module.exports = router;
