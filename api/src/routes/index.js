const express = require('express');
const {check} = require("express-validator");
const authController = require("../controllers/auth/authController");
const auth = require("../middleware/auth");
const router = express.Router();

router.use('/auth', require('./auth/auth'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
router.use('/products', require('./guest/product'));
router.use('/order', require('./user/order'));
router.use('/categories', require('./guest/category'));
router.use('/slides', require('./guest/slide'));

// router.use('/guest', require('./guest/guest'));
router.get(
    '/me',
    auth,
    authController.me
);
router.put(
    '/me',
    auth,
    authController.updateProfile
);

module.exports = router;
