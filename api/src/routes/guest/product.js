const express = require('express');
const router = express.Router();
const productController = require('../../controllers/guest/productController');

// Lấy danh sách sản phẩm
router.get('/', productController.getListsProduct);
router.get('/label', productController.getListsProductLabel);
router.get('/show/:id', productController.showProductDetail);
router.get('/vote-dashboard/:id', productController.showDashboardVoteDetail);

module.exports = router;
