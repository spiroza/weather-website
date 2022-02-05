const path = require('path');
const express = require('express');
const req = require('express/lib/request');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
console.log(__dirname);

const app = express();

// Define paths for Express controls
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');
// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gregg Seipp'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gregg Seipp'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Not much help, but, hello!',
        name: 'Gregg Seipp'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }
    const address = req.query.address;
    console.log('Location: ' + address);
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({
                error:  "Unable to find location."
            })
            return console.log('Error', error);
        }
        forecast(latitude, longitude, (error, conditions) => {
            if (error) {
                res.send({
                    error: "Unable to get forecast for location."
                });
                return console.log('Error', error);
            }
            console.log(location);
            console.log(conditions)
            res.send({
              address: address,
              conditions: conditions              
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:  "You must provide a search term"
        });
    }
    console.log(req.query);
    console.
    res.send({
        products: [] 
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oops',
        message: 'Help article not found.',
        name: 'Gregg Seipp'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oops',
        message: 'Page not found.',
        name: 'Gregg Seipp'
    });
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});