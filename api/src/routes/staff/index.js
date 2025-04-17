const express = require('express');
const router = express.Router();


router.use('/services', require('./service'));
router.use('/hairswap', require('./hairswap'));

module.exports = router;
