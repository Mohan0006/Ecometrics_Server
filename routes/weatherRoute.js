const express = require('express');
const router = express.Router();

const {getCurrentWeather,getWeatherForecast} = require('../controllers/weatherController');

router.route('/weather/').get(getCurrentWeather);
router.route('/weather/forecast').get(getWeatherForecast);

module.exports = router;