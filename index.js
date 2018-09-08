const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const helmet = require('helmet');
const compression = require('compression');
const NodeGeocoder = require('node-geocoder');
const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.xframe());
app.use( helmet.hidePoweredBy() ) ;
app.use( helmet.hsts( { maxAge: 7776000000 } ) ) ;
app.use( helmet.frameguard( 'SAMEORIGIN' ) ) ;
app.use( helmet.xssFilter( { setOnOldIE: true } ) ) ;
app.use( helmet.noSniff() ) ;
app.use(helmet.csp({ defaultSrc: ["'self'"] }));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( function( req, res, next ) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next() ;
} ) ;

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

app.get('/api/geolocation', async (req, res) => {
  const geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: process.env.OPENCAGE_APIKEY
  });

  geocoder.geocode(`${req.query.latitude},${req.query.longitude}`, (err, result) => {
    if(err) {
      res.status(400).send(err);
    }

    res.status(200).send(result);
  });
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
