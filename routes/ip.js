const getGeolocationByIp = require('../api/getGeolocationByIp');

module.exports = async (req, res) => {
  const endpoint = (ip) => `http://api.ipstack.com/${ip}`;
  const data = await getGeolocationByIp(endpoint(req.query.ip));

  res.status(200).send(data);
};
