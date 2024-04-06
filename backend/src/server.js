require('dotenv').config()
const express = require('express')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const {initializePassport} = require('./config/passport')
const mongoose = require('mongoose')


const indexRoute = require('./routes/index.routes')
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
initializePassport()

app.use('/', indexRoute)


app.listen(process.env.PORT, ()=>{
    mongoose.connect('mongodb+srv://emilianokaleb:Mongokaleb2005@proyectocoder.bmy8cw1.mongodb.net/pumigos').then(()=>{
        console.log('database connected')
    })
})