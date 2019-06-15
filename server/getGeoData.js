const https = require('https');
const config = require('./../config.js')

function getGeoData (str, callback) {

  https.get(`${config.reqUrl}?key=${ config.apiKey }&q=${ str }&format=json`, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    callback(null, JSON.parse(data))
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
  callback(err.message, null)
});
}

module.exports.getGeoData = getGeoData