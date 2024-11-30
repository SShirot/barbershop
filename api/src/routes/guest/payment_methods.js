const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/user/paymentMethodsController');

// Lấy danh sách sản phẩm
router.get('/', Controller.getAll);

module.exports = router;
