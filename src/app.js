const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine','hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Craig'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Craig'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Push the right button',
        name: 'Craig'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address || req.query.address ==='') {
        return res.send({
            error: 'Missing Address',
            msg: 'An address must be provided'
        })
    }

    geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } else if (longitude) {
            forecast(lattitude, longitude, 'm', (error, forecastData) => {
                if (error)
                    return res.send({ error })
                if (forecastData){
                    const weatherForecast = forecastData.current.weather_descriptions[0] + '. It is currently ' + forecastData.current.temperature + ' degrees out. It feels like ' + forecastData.current.feelslike + ' degrees.'
                    res.send({
                        location: location,
                        forecast: weatherForecast,
                        address: req.query.address
                    })
                }
            })
        } else {
            return res.send('Unknown error')
        }
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404 Error', {
        title: '404',
        message: 'Help article not found',
        name: 'Craig'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'Page not found',
        name: 'Craig'
    })
})

const port = 3000
app.listen(port, () => {
    console.log('Server started on port ' + port)
})