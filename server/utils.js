const fs = require('fs');
const xml2js = require('xml2js');
const _ = require('lodash');

function readXML(callback) {
    const parser = new xml2js.Parser()
    fs.readFile(__dirname + '/delivery-areas.xml', (err, data) => {
        parser.parseString(data, (err, result) => {
            var responseData = _.get(result, 'kml.Document.[0].Placemark')
            responseData = compareCoordinates(responseData)
            callback(responseData)
        })
    })
}

function compareCoordinates(areas) {
    var finalCoordinates = []
    areas.map((area) => {
        var name = _.get(area, 'name[0]')
        var coordinates = _.get(area, 'Point[0].coordinates[0]', undefined) || _.get(area, 'Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates[0]', '')
        coordinates = coordinates.replace(/(\r\n|\n|\r)/gm, "").trim().split('              ')
        _.map(coordinates, function(cord) {
            cord = cord.split(',')
            finalCoordinates.push({
                latitude: cord[0],
                longitude: cord[1],
                id: cord[2],
                name
            })
        }, [])
    })
    return finalCoordinates
}
function parseUrl (address) {
    return '' + address.street + ', ' + address.zip + ' ' + (address.city ? address.city + ', ' : '') + address.state + ' ' + address.country
}

function getNearestStore (storeData, location) {
    var longitude, latitude

    _.map(location, function (loc) {
        if (loc.lat && loc.lon) {
            latitude = loc.lat
            longitude = loc.lon
        }
    })

    return closestLocation({
        latitude,
        longitude
    }, storeData)
}

function closestLocation(targetLocation, locationData) {
    function vectorDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy);
    }

    function locationDistance(location1, location2) {
        var dx = location1.latitude - location2.latitude,
            dy = location1.longitude - location2.longitude;

        return vectorDistance(dx, dy);
    }

    return locationData.reduce(function(prev, curr) {
        var prevDistance = locationDistance(targetLocation , prev),
            currDistance = locationDistance(targetLocation , curr);
        return (prevDistance < currDistance) ? prev : curr;
    });
}

module.exports.readXML = readXML
module.exports.parseUrl = parseUrl
module.exports.getNearestStore = getNearestStore
