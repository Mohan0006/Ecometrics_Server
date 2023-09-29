const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getCurrentWeather(req, res, next) {

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: { q: `${req.query.latitude},${req.query.longitude}` },
        headers: {
            'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
            'X-RapidAPI-Host':  `${process.env.X_RapidAPI_Host}`
        }
    };

    try {
        console.log("Current Weather");
        const data = await axios.request(options);
        res.status(200).send(data.data);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
}

async function getWeatherForecast(req, res, next){
    
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.query.latitude}&lon=${req.query.longitude}&appid=${process.env.AIR_API_KEY}`;
    try {
        const data = await axios.get(url);

        const segregatedDataArray = data.data.list.map(item => {
            return {
                timestamp: item.dt,                                 // Unix timestamp of the data point
                temperature: item.main.temp,                        // Temperature in Kelvin
                feelsLike: item.main.feels_like,                    // "Feels like" temperature in Kelvin
                humidity: item.main.humidity,                       // Humidity percentage
                windSpeed: item.wind.speed,                         // Wind speed in meters per second
                windDirection: item.wind.deg,                       // Wind direction in degrees
                weatherDescription: item.weather[0].description,    // Description of weather conditions
                cloudCoverage: item.clouds.all,                     // Cloud coverage percentage
                pressure: item.main.pressure,                       // Atmospheric pressure in hPa
                pop: item.pop,                                      // Probability of precipitation
                datetime: item.dt_txt                               // Date and time in string format
              };
          });

        res.status(200).send(segregatedDataArray);
    }
    catch (error) {
        res.status(400).send(error);
    }
}



// export the function
module.exports = {getCurrentWeather,getWeatherForecast};    