const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/orderController');
const auth = require('../../middleware/auth');

router.get('/', auth, orderController.getAllOrder);
router.post('/update-status/:id', auth, orderController.updateOrderStatus);
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
