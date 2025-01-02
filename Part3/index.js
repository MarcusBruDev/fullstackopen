const express = require('express');
const morgan = require('morgan');
const app = express();


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


function generateId(max){
    return Math.random() * max
  }


app.get('/', (req, res) =>{
    res.send('Hello World');
} )


app.get('/api/persons',(request,response)=>{
    response.json(persons)
})


app.get('/info',(request,response)=>{
    const date= new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people <br><br>  ${date}</p>`)

})

app.get('/api/persons/:id',(request,response)=>{
        let id = Number(request.params.id)
        let person = persons.find(person => person.id == id)

        if(person){
            response.json(person)
        }else{
            response.status(404).end()
        }
    
})


app.delete('/api/persons/:id',(request,response)=>{
    let id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
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

        const person ={
            name: body.name,
            number: body.number,
            id: generateId(1000000)
        }

        
        persons = persons.concat(person)
        response.json(persons)
})



const PORT = 3001;
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});

