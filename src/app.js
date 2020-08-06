const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express configs
const publicPath = path.join(__dirname, '../public')
const viewPaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlbar engine and views
app.set('view engine', 'hbs')
app.set('views',viewPaths)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Ana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Lorem Ipsum',
        name: 'Ana'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must set the address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        } 

        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast,
                location,
                address: req.query.address
             })
        })
    })


    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errors: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) =>{
    res.status(404).render('404', {
        title: '404',
        message: 'Help Article not found',
        name: 'Ana'
    })
})

app.get('*', (req, res) =>{
    res.status(404).render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Ana'
    })
})

app.listen(3000, () => {
    console.log('Server is up for port 3000')
})

