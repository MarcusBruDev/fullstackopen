const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User= require('../models/user')


userRouter.post('/',async (request,response)=>{
    
    
    const {userName, name, password}= request.body

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash= await bcrypt.hash(password,salt)
  
    
    
    const user = new User({
        userName,
        name,
        password: passwordHash
    })
  

    const savedUser= await user.save()
    response.status(201).json(savedUser)
   
})


userRouter.get('/',async(request,response)=>{
    const objectsUsers= await User.find({}).populate('notes',{content:1,important:1})
    console.log(objectsUsers)
    response.json(objectsUsers)
})

module.exports = userRouter





