const express = require('express')
require('express-async-errors')
const blogListRouter= require('./controllers/bloglists')
const usersBlogListRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware') 
const app  = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors= require('cors')
const mongoose = require('mongoose')








mongoose.connect(config.MONGODB_URI)
.then(result=>{
    logger.info('connected to MongoDB')
})
.catch(error=>{
    logger.error('Error connecting to MongoDB:', error.message)    
})

app.use(cors()) 
app.use(express.json())





//app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)

app.use('/api/blogs',blogListRouter)
app.use('/api/users',usersBlogListRouter)
app.use('/api/login',loginRouter )
app.use('/api/blogs/:id',middleware.userExtractor,blogListRouter )



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports= app