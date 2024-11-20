const express = require('express');
const router = express.Router();
const productController = require('../../controllers/guest/productController');

// Lấy danh sách sản phẩm
router.get('/', productController.getListsProduct);
router.get('/show/:id', productController.showProductDetail);

module.exports = router;
