const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/orderController');
const auth = require('../../middleware/auth');

router.get('/', auth, orderController.getAll);
router.post('/', auth, orderController.create);
router.put('/:id', auth, orderController.update);
router.post('/update-status/:id', auth, orderController.updateStatus);
router.delete('/:id', auth, orderController.delete);

module.exports = router;
