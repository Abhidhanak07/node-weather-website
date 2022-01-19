const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


//      define path for express config
const publicPathDirectory = path.join(__dirname, '../public' )
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//      setup handelbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicPathDirectory))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Abhishek'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
      helptext:"This is some Helpful text",
      title:'Help',
      name:'Abhishek',
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:"404",
        name:"Abhsihek",
        errorMessage:"404 Page not found"
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:"About Me",
        name:"Abhsihek"
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error:"You must provide a address term"
        })    
    }
    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location:data.location,
                latitude:data.latitude,
                longitude:data.longitude,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })    
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


app.get('*', (req,res) =>{
    res.render('404', {
        title:"404",
        name:"Abhishek",
        errorMessage:"404 Page not found"
    })
})

app.listen(3000, () => {
    console.log("Listning to the port 3000");
})