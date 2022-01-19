const request = require('request')

const forecast = (latitude, longitude,  callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=74eefcc61cc8f2969ea5fdf1ae70fdcb&query=' + latitude + ',' + longitude + '&units=f'
     request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +". it is currently " + body.current.temperature + " degres out there . it feels like " + body.current.feelslike + " degres out")
        }
    })
}

module.exports = forecast


// .body.current.weather_descriptions[0] +". it is currently " + response.body.current.temperature + " degres out there . it feels like " + response.body.current.feelslike + " degres out"); 