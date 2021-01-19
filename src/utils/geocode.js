const request = require('postman-request')
const chalk = require('chalk')

const geocode = (location, callback) => { 
 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiY3JhaWcyODk4IiwiYSI6ImNrandhOGZ2MjR6NnUyeW1wNzB1cDdoZ2gifQ.zqgI8Rj3IMSGDLKp9qKRcg&limit=1'

    request({ url, json: true}, (error, { body }) =>{
        if (error) {
           callback('unabke to connect to location service', undefined)
        } else if(body.message === 'Not Found' || body.features.length === 0) {
            callback('Search location ' + location + ' not found', undefined)
        } else {
            const data = {
                location: body.features[0].place_name,
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }
            
            callback(undefined, data)
        }
    })
}

module.exports = geocode