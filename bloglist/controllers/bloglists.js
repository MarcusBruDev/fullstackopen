const blogListRouter = require('express').Router()
const Bloglist = require('../models/bloglist')


blogListRouter.post('/',(request,response)=>{
    const body = request.body

    const blog = new Bloglist({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })


    blog.save().then(savedBlog=>{
        response.json(savedBlog)    
    })
    .catch(error=>{
        console.log(error)
    })

})


blogListRouter.get('/',(request,response)=>{
    Bloglist.find({}).then(blogs=>{
        response.json(blogs)
    })
})

module.exports = blogListRouter