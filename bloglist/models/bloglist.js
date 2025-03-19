const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    author: String,
    url: {
        type:String,
        required:true
    },
    likes: {
        type:Number,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


blogSchema.set('toJSON',{
    transform: (document, returnedObjet)=>{
        returnedObjet.id= returnedObjet._id.toString()
        delete returnedObjet._id
        delete returnedObjet.__v
    }
  })

  
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog