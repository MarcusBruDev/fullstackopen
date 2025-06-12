const blogListRouter = require('express').Router()

const Bloglist = require('../models/bloglist')
const UserBlogList = require('../models/user')
const mongoose = require('mongoose');

const middleware = require('../utils/middleware');



blogListRouter.post('/', middleware.userExtractor ,async (request,response)=>{
    const body = request.body
    const userToken= request.user



    if(!userToken.id){
       
        return response.status(401).json({error:'token invalidss'})
    }



    
    if (mongoose.Types.ObjectId.isValid(userToken.id)) {

        const user= await UserBlogList.findById(userToken.id)
   

        const blog = new Bloglist({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })  
    
        
    
        
        const savedBlog = await blog.save();
       
      
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        
    
    
    
        if(savedBlog){
            
            response.status(201).json(savedBlog)
        }else{
            response.status(400).end()
        }




    } else {
        console.log('El ID no es válido');
    }
    
   


})



blogListRouter.get('/',async (request,response)=>{
    
  
  const blogs= await  Bloglist.find({}).populate('user',{username:1,name:1})
  response.json(blogs)

})





blogListRouter.get('/:id',(request,response,next)=>{
    
    Bloglist.findById(request.params.id)
    .then(result=>{
        response.json(result)
    })
})


//Para borrar todos los blogs de la base de datos sin TOKEN
blogListRouter.delete('/',async (request,response)=>{

    await Bloglist.deleteMany({})
    response.status(204).end()

})


blogListRouter.delete('/:id',middleware.userExtractor,async (request,response)=>{
    let idTodelete = request.params.id

    let result= await Bloglist.findById(idTodelete) 
    

    const user= request.user


    
    if(result.user.toString() === user.id.toString()){
        await Bloglist.deleteOne({_id:idTodelete})
        response.status(204).end()
    }else{
        response.status(401).json({error:'token invalidss'})
    }


})


blogListRouter.put('/:id', middleware.userExtractor ,async (request,response)=>{
    const body= request.body
    const userToken= request.user
    
    if(!userToken.id){
        return response.status(401).json({error:'token invalidss'})
    }


    if (mongoose.Types.ObjectId.isValid(userToken.id)) {

        const user= await UserBlogList.findById(userToken.id)
        console.log(user.id)


        const blog={
            title: body.title,  
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        


        let updateBlog= await  Bloglist.findByIdAndUpdate(request.params.id,blog,{new:true})


        user.blogslikes = user.blogslikes.concat(updateBlog.id)
        
        await user.save()
        response.json(updateBlog)

    }
    else {
        console.log('El ID no es válido');
    }



  
    
})


module.exports = blogListRouter