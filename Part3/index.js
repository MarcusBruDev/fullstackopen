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



const errorHandler=(error, request,response,next)=>{
    
    

    if(error.name === 'CastError'){
        return response.status(400).send({error: 'malformatted id'})
    }else if(error.name==='ValidationError'){
        return response.status(400).json({error:error.message}) 
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
    Phonebook.find({})
    .then(person=>{
        response.send(`<p>Phonebook has info for ${person.length} people <br><br>  ${date}</p>`)
    })
    

})

app.get('/api/persons/:id',(request,response)=>{
        let id = Number(request.params.id)

        Phonebook.findById(request.params.id)
        .then(person=>{
            console.log(person.name)
            response.json(person)
        })
})


app.delete('/api/persons/:id',(request,response)=>{


    Phonebook.findByIdAndDelete(request.params.id)
    .then(result=>{
        response.status(204).end()
    })
    .catch(error=>{
        next(error)
    })
})



app.post('/api/persons',(request,response,next)=>{
        const body = request.body

    

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

        person.save()
        .then(savedPerson=>{
            response.json(savedPerson)
        })
        .catch(error=>{
            next(error)     
        })
      
        
    
})


app.put('/api/persons/:id',(request,response,next)=>{


    const actualizacion =request.body


    Phonebook.findByIdAndUpdate(
        request.params.id,
        actualizacion,
        {new:true,runValidators:true}
    )
    .then(updatePerson=>{
        console.log(updatePerson)
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

