const mongoose = require('mongoose')





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