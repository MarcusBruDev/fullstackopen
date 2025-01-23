const mongoose = require('mongoose')
if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}


const password = process.argv[2]

const url= `mongodb+srv://marcusbrudev:${password}@cluster0.0pdmn.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`



mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})


const Note= mongoose.model('Note',noteSchema)

const note = new Note({
    content:  'Soy capaz de aprender cualquier cosa 1',
    important: true,
})


Note.find({}).then(result=>{
    result.forEach(note=>{
        console.log(note)
    })
})


/*note.save().then(result=>{
    console.log('note saved!')
    mongoose.connection.close()
})*/

