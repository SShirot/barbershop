const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/attributeController');
const auth = require("../../middleware/auth");

router.get('/', auth, controller.getAll);
router.get('/:id', auth,controller.findById);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id',auth, controller.delete);

module.exports = router;
