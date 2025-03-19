const BlogList = require('../models/bloglist')
const UserBlogList = require('../models/user')

const initialBlogs  = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  ,
   
]


const blogsInDb= async ()=>{
    const blogs = await BlogList.find({})
    return blogs.map(blog=> blog.toJSON())

}

const usersinDb = async ()=>{
    const users = await  UserBlogList.find({})
    return users.map(user=> user.toJSON())
}

module.exports={
    initialBlogs,
    blogsInDb,
    usersinDb
}

