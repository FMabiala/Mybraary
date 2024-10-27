// Server j.s
//check if it's running in dev environment & load the requirement
// dependency in Env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// imprt express
const express = require('express')
// import express from 'express'
// Call the express app fn
const app = express()
// imprt layout
// import expressLayouts from 'express-ejs-layouts'
const expressLayouts = require('express-ejs-layouts')
//inport body-parder
const bodyParser = require('body-parser')


// Create or link to the Route/ Hook the router as index file from the views
// import indexRouter from './routes/index.js'
const indexRouter = require('./routes/index')
// 2nd link to hook the Router file- as path ./routes/autors.js
// create variable
const authorRouter = require('./routes/authors')

//create Express app

//set the view engine
app.set('view engine', 'ejs')
//call view path
app.set('views', __dirname + '/views')
//call layout
app.set('layout', 'layouts/layout')

//Tell the app to use Layouts, public folder, body-parser
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false})) //set the limit the server can accept


// After app - Set up the Data-Base
//import mongoose db
const mongoose = require('mongoose')
//Set up a connection to the data-base, by passing the URL
mongoose.connect(process.env.DATABASE_URL
)
//check if we are connected to the db
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to Mongoose'))

// * allow the app to use the Router, i.e the index file in question*
app.use('/', indexRouter)
app.use('/authors', authorRouter)

//enable the app to listen

app.listen(process.env.PORT || 3000)
