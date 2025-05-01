const getWeatherCondition = require('../api/getWeatherCondition');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  const secret = process.env.WEATHER_API;
  const baseUrl = 'https://api.weatherapi.com';
  const endpoint = (ip) => `${baseUrl}/v1/forecast.json?q=${ip}&lang=en&key=${secret}&days=6&aqi=no&alerts=no`;
  const data = await getWeatherCondition(endpoint(req.query.ip));

  res.status(200).send(data);
};
