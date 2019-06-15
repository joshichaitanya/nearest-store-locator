const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const {readXML, parseUrl, getNearestStore} = require('./utils.js')
const getGeoData = require('./getGeoData.js').getGeoData
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

var jsonParser = bodyParser.json()


app.post('/api/greeting', jsonParser, (req, res) => {
  readXML((storeData) => {
    res.setHeader('Content-Type', 'application/json');
    getGeoData(parseUrl(req.body), function(err, data) {
      if (err) {
        return res.send({
          message: err,
          errorCode: 500
        });        
      }
      const nearestStore = getNearestStore(storeData, data)
      console.log('nearestStore', nearestStore)
      return res.send(JSON.stringify(nearestStore));
    })
  })
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);