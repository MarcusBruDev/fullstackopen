const {test,after , beforeEach, describe}= require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const User= require('../models/user')
const api = supertest(app)


describe('When there is initially on user in db',()=>{


    beforeEach(async ()=>{
        await User.deleteMany({})

        const passwordHash = await  bcrypt.hash('secret',10)
        const user = new User({userName: 'root',  password: passwordHash})

        await user.save()
    })


    test('Creation succeeds with a fresh username',async ()=>{
        const usersAtStart= await helper.usersInDb()

        const newUser={
            userName:'M&M',
            name: 'Matias',
            password:"M&MMatias"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-type', /application\/json/)

        const userAtEnd= await helper.usersInDb()
        assert.strictEqual(userAtEnd.length, usersAtStart.length +1)

        
        const usernames = userAtEnd.map(user=>user.userName)
        assert(usernames.includes(newUser.userName))



    })


    test('creation fails with propers statuscode and message ir username already taken',async ()=>{
        const userAtStart = await helper.usersInDb()

        const newUser = {
            userName: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        let result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-type', /application\/json/)

        const userAtEnd = await helper.usersInDb()

        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(userAtStart.length, userAtEnd.length)
    })

})

after(async ()=>{
    await mongoose.connection.close()
})