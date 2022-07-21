const getGeolocationByIp = require('../api/getGeolocationByIp');

module.exports = async (req, res) => {
  const endpoint = (ip) => `https://tools.keycdn.com/geo.json?host=${ip}`;
  const data = await getGeolocationByIp(endpoint(req.query.ip), 'keycdn-tools:iondrimbafilho.me');

  res.status(200).send(data);
};
