const request = require("request");

const forecast = (lat, long, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=5a13568834250778bf72015adbb30035&query=${lat},${long}&units=f`;
    request({uri: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.error) {
            callback('Unable to get weather for location.  Please try again.', undefined);
        } else {
            const windDirection = body.current.wind_degree.toString().padStart(3, '0');
            callback(undefined, `The temperature is ${body.current.temperature}.  It feels like ${body.current.feelslike}.  Wind is ${windDirection} at ${body.current.wind_speed} knots.`);
        }
    });
}

module.exports = forecast;