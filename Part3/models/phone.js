const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log(`connecting to ${url}`)


mongoose.set('strictQuery', false);

mongoose.connect(url)
    .then(result=>{
        console.log('connected to MongoDB')
    })
    .catch(error=>{
        console.log('error connecting to MongoDB:', error.message)  
    })

const phoneSchema= new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        validate:{
            validator: function(v){
                //const regex = /^\d{2,3}-\d{1,}$/;
                return /^\d{2,3}-\d{1,}$/.test(v)
            },
            message: props=>`${props.value} is not a valid phone number`
        },
        minlength: 8,
        required: true
    }
})

phoneSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
            returnedObject.id= returnedObject._id.toString()    
            delete returnedObject._id
            delete returnedObject.__v
    }
})


const Phonebook = mongoose.model('People', phoneSchema)

module.exports = Phonebook
