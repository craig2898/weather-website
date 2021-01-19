const request = require('postman-request')
const chalk = require('chalk')

const forecast = (lat, long, units, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=413fffef951ea2dfbeea95b16276c3ec&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=' + encodeURIComponent(units)

    request({ url, json: true}, (error, { body }) =>{
        if (error) {
            callback(chalk.red('Error: ') + 'Unabke to connect to weather service', undefined)
        } else if(body.error) {
            callback(chalk.red('Error: ') + 'Probably an invalid location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast