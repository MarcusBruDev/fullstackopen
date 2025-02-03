const app=require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')


console.log('Despues de conectarme a la base de datos corro el servdor')
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

