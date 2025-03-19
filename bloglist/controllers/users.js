const bcrypt = require('bcrypt')
const usersBlogListRouter = require('express').Router()
const UserBlogList= require('../models/user')




usersBlogListRouter.post('/',async (request,response)=>{
        const {username, name, password}= request.body

        

                if(password.length<3 || username.length<3){
                        return response.status(400).json({error:'the password or the username must be min 3 characters'})
                      //  return response.status(400).send(error)
                }

               

               const saltRounds = 10;
               const salt = await bcrypt.genSalt(saltRounds);
               const passwordHash= await bcrypt.hash(password,salt)
             
               
               
               const user = new UserBlogList({
                   username:username,
                   name:name,
                   password: passwordHash
               })
             
           
               const savedUser= await user.save()
               response.status(201).json(savedUser)

})


usersBlogListRouter.get('/',async (request,response)=>{
        
        const objectUsers = await UserBlogList.find({}).populate('blogs',{title:1,author:1,url:1})      
        
        response.json(objectUsers)
})


module.exports= usersBlogListRouter


