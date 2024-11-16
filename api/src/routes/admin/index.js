const express = require('express');
const router = express.Router();

router.use('/users', require('./user'));
router.use('/menus', require('./menu'));
router.use('/tags', require('./tags'));
router.use('/articles', require('./post'));
router.use('/categories', require('./category'));
router.use('/order', require('./order'));
router.use('/services', require('./service'));
router.use('/products', require('./product'));
router.use('/product-labels', require('./productLabel'));
router.use('/slides', require('./slide'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;
