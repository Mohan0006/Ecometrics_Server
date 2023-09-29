const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const fs = require('fs');

//environment variables
dotenv.config({path: 'config/config.env'});

//routes
const getWeather = require("./routes/weatherRoute");
const getAir = require("./routes/airRoute");

//middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log('CORS middleware executed');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use("/api/v1", getWeather);
app.use("/api/v1", getAir);

//homepage
app.get("/", (req, res) => {  
    res.send("Hello World!");
});

//starting the server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});

