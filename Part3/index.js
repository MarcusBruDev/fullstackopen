require('dotenv').config()  
const express = require('express');
const morgan = require('morgan');
const cors= require('cors')
const Phonebook = require('./models/phone')
const app = express();





app.use(cors())
app.use(express.static('dist'));
app.use(express.json());
morgan.token('body',(request,response)=>JSON.stringify(request.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body '));







let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


const generateId = ()=>{
    console.log("Destro de generar id")
    const maxId = persons.length > 0 ? Math.max(...persons.map(person=> person.id)) : 0
    return maxId +1;
  
}

const errorHandler=(error, request,response,next)=>{
    console.error(error.message);

    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}
  

app.get('/', (req, res) =>{
    res.send('Hello World');
} )


app.get('/api/persons',(request,response)=>{
    Phonebook.find({}).then(person=>{
        response.json(person)
    })
})


app.get('/info',(request,response)=>{
    const date= new Date()
    Phonebook.find({}).then(person=>{
        response.send(`<p>Phonebook has info for ${person.length} people <br><br>  ${date}</p>`)
    })
    

})

app.get('/api/persons/:id',(request,response)=>{
        let id = Number(request.params.id)
        //let person = persons.find(person => person.id == id)

        Phonebook.findById(request.params.id).then(person=>{
            response.json(person)
        })

       /* if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }*/
    
})


app.delete('/api/persons/:id',(request,response)=>{


    //let id = Number(request.params.id)
    //persons = persons.filter(person => person.id !== id)
    //response.status(204).end()

    Phonebook.findByIdAndDelete(request.params.id)
    .then(result=>{
        response.status(204).end()
    })
    .catch(error=>{
        next(error)
    })
})



app.post('/api/persons',(request,response)=>{
        const body = request.body

        persons.forEach(person => {
            if(person.name === body.name){
                return response.status(400).json({
                    error: 'name must be unique'
                })
            }
        })



        if(!body.name){
            return response.status(400).json({
                error: 'name missing'
            })
        }


        if(!body.number){
            return response.status(400).json({
                error: 'number missing'
            })
        }

        const person= new Phonebook({
            name: body.name,
            number: body.number
        })

        person.save().then(savedPerson=>{
            response.json(savedPerson)
        })
        
    
})


app.put('/api/persons/:id',(request,response)=>{

    const body= request.body
    console.log("aqui")

    const person={
        name:body.name,
        number:body.number 
    }

    Phonebook.findByIdAndUpdate(request.params.id,person,{new:true})
    .then(updatePerson=>{
        response.json(updatePerson)
    })
    .catch(error=>{
        next(error)
    })
})



app.use(errorHandler)


const PORT = process.env.PORT 
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});

