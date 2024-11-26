const express = require('express');
const router = express.Router();
const settingInformationController = require('../../controllers/admin/settingInformationController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, settingInformationController.getInfo);

module.exports = router;
