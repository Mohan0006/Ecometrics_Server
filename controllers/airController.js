const express = require('express');
const router = express.Router();
const axios = require('axios');

async function getAir(req, res, next) {

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${req.query.latitude}&lon=${req.query.longitude}&appid=${process.env.AIR_API_KEY}`;
    
    console.log(req.query);

    try {
        const data = await axios.get(url);
        res.status(200).send(data.data.list[0]);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }
}


async function getAirHistory(req, res, next) {

    // Get current date and time in UTC
    const currentDate = new Date();
    const currentUnixTime = Math.floor(currentDate.getTime() / 1000); // Convert to Unix time (seconds)

    // Calculate date and time before 5 days
    const fiveDaysAgo = new Date(currentDate);
    fiveDaysAgo.setDate(currentDate.getDate() - 5);
    const fiveDaysAgoUnixTime = Math.floor(fiveDaysAgo.getTime() / 1000); // Convert to Unix time (seconds)

    const url = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${req.body.latitude}&lon=${req.body.longitude}&start=${fiveDaysAgoUnixTime}&end=${currentUnixTime}&appid=${process.env.AIR_API_KEY}`;

    try {
        const data = await axios.get(url);
        res.status(200).send(data.data.list);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send(error);
    }

}

// export the function
module.exports = {getAir,getAirHistory};    