const testingRouter = require('express').Router()
const Bloglist = require('../models/bloglist')
const UserBlogList = require('../models/user')


testingRouter.post('/reset', async () => {
    console.log('Entro a resetear!!')
    await Bloglist.deleteMany({})
    await UserBlogList.deleteMany({})
    response.status(204).end()
})


module.exports= testingRouter