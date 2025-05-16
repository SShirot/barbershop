const express = require('express');
const router = express.Router();


router.use('/services', require('./service'));
router.use('/hairswap', require('./hairswap'));
router.use('/work-schedule', require('./workSchedule'));

module.exports = router;
