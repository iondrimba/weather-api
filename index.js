const express = require('express')
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const compression = require('compression');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  const data = {
    message: 'Welcome to our restful API'
  };

  res.status(200).send(data);
});

app.get('/api', async (req, res) => {
  const secret = process.env.DARK_SKY_API_CODE;
  const endpoint = (latitude, longitude) => `https://api.darksky.net/forecast/${secret}/${latitude},${longitude}?units=auto`;
  const data = await getWeatherCondition(endpoint(req.query.latitude, req.query.longitude));

  res.status(200).send(data);
});

app.get('/api/ip', async (req, res) => {
  const endpoint = (ip) => `http://api.ipstack.com/${ip}`;
  const data = await getGeolocationByIp(endpoint(req.query.ip));

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

const getGeolocationByIp = async (url) => {
  const params = {
    access_key: process.env.APP_IP_STACK,
  };

  try {
    const response = await fetch(addQueryParams(url, params));
    const result = await response.json();

    return result;
  } catch (error) {
    return error.message;
  }
};

const addQueryParams = (url, params) => {
  let queryString = '';

  Object.entries(params).forEach(([key, value]) => {
    queryString += `${key}=${value}&`;
  });

  return `${url}?${encodeURI(queryString)}`;
}

const server = app.listen(PORT, () => console.log(`app running on port: ${server.address().port}`));
