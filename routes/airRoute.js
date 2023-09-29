const express = require('express');
const router = express.Router();

const {getAir,getAirHistory} = require('../controllers/airController');

router.route('/air/').get(getAir);
router.route('/air/history').get(getAirHistory);

module.exports = router;