const mongoose = require('mongoose')

if(process.argv.length<3){
    console.log('Please provide the password as an argument')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url=  `mongodb+srv://marcusbrudev:${password}@cluster0.0pdmn.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema= new mongoose.Schema({
      name: String,
      number: String
});





const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: personName,
    number: personNumber
})

console.log(process.argv.length)


if(process.argv.length==3){
    console.log('Phonebook:')
    Person.find({}).then(result=>{
        result.forEach(person=>{
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}


if(process.argv.length>3){
    person.save().then(result=>{
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}



