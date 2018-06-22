const express = require('express')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  const data = {
    message: 'Welcome to our restful API'
  };

  res.status(200).send(data);
});

app.listen(PORT, () => console.log("app running on port.", server.address().port));
