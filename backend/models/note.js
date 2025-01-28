const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

console.log(`coneccting to ${url}` )




mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(result=>{
        console.log('connected to MongoDB')
    })
    .catch(error=>{
        console.log(`Error connecting to MongoDB: ${error.message}`)
    })



const noteSchema = new mongoose.Schema({

    content: {
        type: String,
        minLength: 5,
        required: true
    },
    important: Boolean,
})

noteSchema.set('toJSON',{
  transform: (document, returnedObjet)=>{
      returnedObjet.id= returnedObjet._id.toString()
      delete returnedObjet._id
      delete returnedObjet.__v
  }
})

const Note= mongoose.model('Note',noteSchema)

module.exports = Note