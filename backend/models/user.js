const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    password : String,
    // Los identificadoerws de las notas se almacecan en el documento del usuario como una matriz de IDs de Mongo.
    notes:[
        {
            //El tipo de campo es ObjectId que hace referencia a documentos de tipo note.
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
})

userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id= returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})


const User= mongoose.model('User', userSchema)

module.exports = User