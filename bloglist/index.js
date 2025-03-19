const app= require('./app')
const config= require('./utils/config')
const logger= require('./utils/logger')


app.listen(config.PORT, ()=>{
    logger.info(`Server ruuning on port ${config.PORT}`)
})

//Part5