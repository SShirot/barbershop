const express = require('express');
const router = express.Router();

router.use('/profile', require('./profile'));
router.use('/posts', require('./post'));
router.use('/menus', require('./menu'));
router.use('/order', require('./order'));
router.use('/vote', require('./vote'));
router.use('/products', require('./product'));
router.use('/dashboard', require('./dashboard'));
router.use('/staff-list', require('./staffview'));

module.exports = router;
