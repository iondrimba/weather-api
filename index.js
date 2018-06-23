const express = require('express')
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  const data = {
    message: 'Welcome to our restful API'
  };

  res.status(200).send(data);
});

app.get('/api', function(req, res) {
  const secret = process.env.DARK_SKY_API_CODE;
  const endpoint = (latitude, longitude) => `https://api.darksky.net/forecast/${secret}/${latitude},${longitude}`;
  const data = getWeatherCondition(endpoint(req.query.latitude, req.query.longitude));

  res.status(200).send(data);
});

const getWeatherCondition = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    return error.message;
  }
};

const server = app.listen(PORT, () => console.log(`app running on port: ${server.address().port}`));
