const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/guest/serviceController');

// Lấy danh sách sản phẩm
router.get('/', serviceController.getAll);
router.get('/show/:id', serviceController.findById);
router.post('/register', serviceController.registerService);
router.get('/user', serviceController.getServiceByUserId);
module.exports = router;
