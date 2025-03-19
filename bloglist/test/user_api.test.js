const {test,after , beforeEach}= require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const UserBlogList= require('../models/user')

const api = supertest(app)



beforeEach(async ()=>{
    await UserBlogList.deleteMany({})

    const passwordHash= await  bcrypt.hash('secret',10)
    const user = new UserBlogList({username:'root', password:passwordHash})

    await user.save()
})

test('invalid user are nor created',async ()=>{

    const usersAtStarts = await helper.usersinDb()


    const newUser={
        username: "Ma",
        password:"password_Prueba",
        name:"nombre_prueba"
    }

   await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-type', /application\/json/)

    const usersAtEnd= await helper.usersinDb()

    assert.strictEqual(usersAtStarts.length, usersAtEnd.length)



})

after(async ()=>{
    await mongoose.connection.close()
})

