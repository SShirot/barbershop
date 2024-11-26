const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/guest/adminController');

router.get('/', adminController.getListsAdmin);

module.exports = router;
