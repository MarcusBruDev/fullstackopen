const {test,after , beforeEach}= require('node:test')
const jwt = require('jsonwebtoken')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const BlogList= require('../models/bloglist')
const User = require('../models/user')
const { console } = require('node:inspector')

let tokenGlogal = ""

const api = supertest(app)

beforeEach(async ()=>{
    await BlogList.deleteMany({})
    await User.deleteMany({})

      
                   
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash= await bcrypt.hash('16666666',salt)


    const user = new User({username:'MarcusBruDiazDev', name:'MarcusBruDiazDev', password:passwordHash})

    const savedUser= await user.save()

    const userForToken= {
        username: savedUser.username,
        id: savedUser._id
    }   

    const token = jwt.sign(userForToken,process.env.SECRET)
    tokenGlogal = token 
    
    
    


    for(let blog of helper.initialBlogs){
      
        blog.user = savedUser._id
        const blogobject = new BlogList(blog)
   
        await blogobject.save()
    }

})

test('Blogs are returned as Json',async ()=>{
    

    await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${tokenGlogal}`)
    .expect(200)
    .expect('Content-Type',/application\/json/)
})


test('There are two notes',async ()=>{
    const blogsEnd= await helper.blogsInDb()
    assert(blogsEnd.length, helper.initialBlogs.length)
})


test('unique identifier of blog posts is called id',async ()=>{
    const blogsEnd= await helper.blogsInDb()
    const blog = blogsEnd[0]
    //console.log(blog)
    assert(blog.id)
})


test('A valid blog can be added',async ()=>{

    const usersAtStarts = await helper.blogsInDb()
    const user= await helper.usersinDb()
    console.log("USUARIO....  ",user)
    //const user= await BlogList.findOne({username})

    //const passwordCorrect = user === null ? false : await bcrypt.compare(password,user.password)
    

    

    const newBlog=  {
        title: "Dios todo lo puede",
        author: "Marcus Bru",
        url: "https://reactpatterns.com/",
        likes: 7
    }


    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${tokenGlogal}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)



    const blogsAtEnd= await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length+1)



})



test('there are not property likes',async ()=>{

    const newBlog=  {
        title: "Dios todo lo puede",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
     
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${tokenGlogal}`)
    .send(newBlog)  
    .expect(400)

    const blogsAtEnd= await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

})


test('Check if title or url field is missing',async ()=>{
    const newBlog=  {
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes:7
    }


    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${tokenGlogal}`)
    .send(newBlog)
    .expect(400)

})



test('Deleting a publication',async ()=>{
    
    const blogsAtStart= await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    console.log(blogToDelete[0])

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${tokenGlogal}`)
    .expect(204)

    const blogsAtEnd =   await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)
    
})


test('Updating likes publication',async ()=>{
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog ={
        title: "Dios todo lo puede",
        author: "Marcus Bru",
        url: "https://reactpatterns.com/",
        likes: 1111,
    }
    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${tokenGlogal}`)
    .send(newBlog)
    .expect(200)

    const blogsAtEnd =   await helper.blogsInDb()
    assert.notEqual(blogToUpdate.likes , blogsAtEnd[0].likes)
})




after(async ()=>{
    await mongoose.connection.close()
}) 