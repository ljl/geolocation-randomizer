var express = require('express');
var bodyParser = require('body-parser');
var geo = require('./geo.js');
var app = express();

app.use('/', express.static('static'));
app.use(bodyParser.json());

app.get('/api/:lat/:long/:radius/:count', function (req, res) {
  var lat = req.params.lat;
  var long = req.params.long;
  var radius = req.params.radius;
  var count = req.params.count;

  res.send(geo.generate({
    'lat': lat,
    'lng': long
  }, radius, count));
});

app.post('/api', function (req, res) {
  var lat = req.body.lat;
  var long = req.body.long;
  var radius = req.body.radius;
  var count = req.body.count;

  res.send(geo.generate({
    'lat': lat,
    'lng': long
  }, radius, count));
});

var server = app.listen(process.env.PORT || 3001, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});;
