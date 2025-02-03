const express = require('express')
const blogListRouter= require('./controllers/bloglists')
const app  = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors= require('cors')
const mongoose = require('mongoose')


app.use(cors()) 
app.use(express.json())



const mongoUrl = config.MONGODB_URI


mongoose.connect(mongoUrl)
.then(result=>{
    logger.info('connected to MongoDB')
})
.catch(error=>{
    logger.error('Error connecting to MongoDB:', error.message)    
})


app.use('/api/blogs',blogListRouter )







module.exports= app