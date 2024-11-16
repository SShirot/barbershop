const express = require('express');
const router = express.Router();

router.use('/profile', require('./profile'));
router.use('/posts', require('./post'));
router.use('/menus', require('./menu'));
router.use('/order', require('./order'));
router.use('/rating', require('./rating'));
router.use('/products', require('./product'));

module.exports = router;
