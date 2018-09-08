const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const PORT = process.env.PORT || 5000;
const index = require('./routes/');
const api = require('./routes/api');
const ip = require('./routes/ip');
const geolocation = require('./routes/geolocation');
const app = express();

app.use(helmet());
app.use(helmet.xssFilter());
app.use(helmet.xframe());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({maxAge: 7776000000}));
app.use(helmet.frameguard('SAMEORIGIN'));
app.use(helmet.xssFilter({setOnOldIE: true}));
app.use(helmet.noSniff());
app.use(helmet.csp({defaultSrc: ['\'self\'']}));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
});

app.get('/', index);
app.get('/api', api);
app.get('/api/ip', ip);
app.get('/api/geolocation', geolocation);

app.listen(PORT, () => console.log(`app running on port: ${app.address().port}`));
