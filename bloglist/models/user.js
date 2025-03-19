const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        //minLength:3
    },
    password : {
        type: String,
        required : true,
    },  
    name: String,
    blogs:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:'Blog' 
        }
       
    ],
})



userSchema.set('toJSON',{
    transform:(document,returnedObjet)=>{
        returnedObjet.id= returnedObjet._id.toString()
        delete returnedObjet._id
        delete returnedObjet.__v
        delete returnedObjet.password
    }

})


const User = mongoose.model('User', userSchema)

module.exports = User
