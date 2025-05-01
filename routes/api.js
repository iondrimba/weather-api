const getWeatherCondition = require('../api/getWeatherCondition');

module.exports = async (req, res) => {
  const secret = process.env.WEATHER_API;
  const baseUrl = 'https://api.weatherapi.com';
  const endpoint = (ip) => `${baseUrl}/v1/current.json?q=${ip}&lang=pt&key=${secret}`;
  const data = await getWeatherCondition(endpoint(req.query.ip));

  res.status(200).send(data);
};
