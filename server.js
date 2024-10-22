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

// Create or link to the Route/ Hook the router as index file
// import indexRouter from './routes/index'
const indexRouter = require('./routes/index')
//create Express app

//set the view engine
app.set('view engine', 'ejs')
//call view path
app.set('views', __dirname + '/views')
//call layout
app.set('layout', 'layouts/layout')


//Tell the app to use Layouts & public folder
app.use(expressLayouts)
app.use(express.static('public'))

// After app - Set up the Data-Base
//import mongoose db
const mongoose = require('mongoose')
//Set up a connection to the data-base, by passing the URL
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
//check if we are connected to the db
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to Mongoose'))

// * allow the app to use the Router, i.e the index file in question*
app.use('/', indexRouter)

//enable the app to listen

app.listen(process.env.PORT || 3001)