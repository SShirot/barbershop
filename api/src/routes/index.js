const express = require('express');
const {check} = require("express-validator");
const authController = require("../controllers/auth/authController");
const auth = require("../middleware/auth");
const router = express.Router();

router.use('/auth', require('./auth/auth'));
router.use('/admin', require('./admin'));
router.use('/user', require('./user'));
router.use('/users', require('./guest/admin'));
router.use('/products', require('./guest/product'));
router.use('/order', require('./user/order'));
router.use('/categories', require('./guest/category'));
router.use('/slides', require('./guest/slide'));
router.use('/service', require('./guest/service'));
router.use('/setting/info', require('./guest/setting'));
<<<<<<< HEAD
router.use('/votes', require('./guest/vote'));
router.use('/brand', require('./guest/brand'));
router.use('/payment-methods', require('./guest/payment_methods'));
router.use('/work-preferences', require('./guest/work_preferences'));
=======
>>>>>>> parent of fed03cf (verify account)

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
