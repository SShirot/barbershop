const express = require('express');
const router = express.Router();
const controller = require('../../controllers/guest/workPreferencesController');

router.get('/',controller.getAll);

module.exports = router;
