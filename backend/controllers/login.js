const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { error } = require('../utils/logger')

loginRouter.post('/', async (request,response)=>{
    const {userName , password} = request.body
    console.log("Password!",password)

    const user = await User.findOne({ userName })
    console.log("User password!",user.password)
    
    
    const passwordCorrect = user === null
        ? false
        : 
        bcrypt.compare(password, user.password)
        .then(result=>{
             
            if (result) {
                console.log("La contraseña es correcta.");
              } else {
                //return response.status(401).json({error: 'contraseña incorrecta'})  
                console.log("La contraseña es incorrecta.");
              }
        }).catch(error=>{
            console.error("Error al comparar las contraseñas:", error);
        })


    

    const userForToken ={
        userName: user.userName,
        id: user._id,
    }

    
    const token = jwt.sign(userForToken,process.env.SECRET)

    response
    .status(200)
    .send({token,userName:user.userName,name: user.name})

})

module.exports = loginRouter
