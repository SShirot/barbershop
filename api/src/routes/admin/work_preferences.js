const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const controller = require('../../controllers/admin/workPreferencesController');

router.get('/', auth,controller.findByUserId);
router.post('/', auth, controller.createOrUpdate);

module.exports = router;
