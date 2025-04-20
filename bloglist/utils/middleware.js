const logger = require('./logger')
const jwt = require('jsonwebtoken')



const getTokenFrom = request=>{
   
    const authorization = request.get('authorization')
   
    if(authorization && authorization.startsWith('bearer ')){
        return authorization.replace('bearer ','')

    }

    return null
}

const unknownEndpoint =(request,response,next)=>{
    
    response.status(404).send({error:'unkound endpoint'})
    next()
}


const tokenExtractor = (request,response,next)=>{
   
    const token = request.header('Authorization');
    
    if(!token){
        return response.status(401).json({error:'Acceso denegado'})
    }

    // Eliminar el prefijo 'Bearer ' del token si está presente
  const tokenSinBearer = token.replace('bearer ', '');
   
  request.token = tokenSinBearer
  next()
}

const errorHandler = (error,request,response,next)=>{
    logger.info(error.message)
    if(error.name === 'CastError'){
        return response.status(400).send({error:'Malformatted id'})

    }else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }

    next(error)
}



const userExtractor = (request,response,next)=>{

    const token = getTokenFrom(request)

    
    if(!token){
        return response.status(401).json({error:'Acceso denegado'})
    }


    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id){
        return response.status(401).json({error:'token invalid'})
    }
    
    request.user = decodedToken
 

    next()
    
}


module.exports={
    tokenExtractor,
    unknownEndpoint,
    errorHandler,
    userExtractor
    
}