const express = require('express');
const router = express.Router();


router.use('/services', require('./service'));

module.exports = router;
