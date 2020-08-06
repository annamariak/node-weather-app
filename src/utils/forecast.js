const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4dce764837e380508ca2299d72cc5ed2&query=' + latitude + ',' + longitude 

    request({ url, json: true }, (error, response, { current, error: apiError }) => {
        if(error) {
           callback('Unable to connect to weather API', undefined)
        } else if (apiError) {
           callback('Request failed with message: '+ body.error.info, undefined)
        } else {
            const {weather_descriptions, temperature, feelslike} = current

            const message = weather_descriptions + '. It is curently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out'   

            callback(undefined,  message)
        }
    })
}

module.exports = forecast