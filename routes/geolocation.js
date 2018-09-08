const NodeGeocoder = require('node-geocoder');

module.exports = async (req, res) => {
  const geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: process.env.OPENCAGE_APIKEY,
  });

  geocoder.geocode(`${req.query.latitude},${req.query.longitude}`, (err, result) => {
    if (err) {
      res.status(400).send(err);
    }

    res.status(200).send(result);
  });
};
