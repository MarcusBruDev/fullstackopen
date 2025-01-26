require('dotenv').config()
const express = require('express')
const cors= require('cors')
const Note  = require('./models/note')  
const app  = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
//notas





let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]



const generateId = ()=>{
  const maxId = notes.length > 0 ? Math.max(...notes.map(note=> note.id)) : 0
  return maxId +1;

}


app.get('/',(request,response)=>{
  response.send('<h1>Hello Marcus Dev!</h1>')
})


app.get('/api/notes', (request,response)=>{
  Note.find({}).then(notes=>{
    response.json(notes)
  })
})


app.get('/api/notes/:id',(request,response)=>{
    let id= Number(request.params.id);
    //let note = notes.find(note=>note.id === id)
    Note.findById(request.params.id).then(note=>{
      response.json(note)
    })

    /*if(note){
      response.json(note)
    }else{
      response.status(404).end()
    }**/
    
})

app.delete('/api/notes/:id',(request,response)=>{
    let id = Number(request.params.id);
    //notes = notes.filter(note=> note.id !== id)

    Note.findById(id).then(result=>{
      response.json(result)
    })

    //response.status(204).end()
})


app.post('/api/notes',(request,response)=>{

      let body= request.body

      if(!body.content){
        return response.status(404).json({error:'Content missing'})
      }





      const note = new Note({
        content: body.content,
        important: body.important || false,
      })

      note.save().then(savedNote=>{
        response.json(savedNote)
      })
      
  
      
})


const PORT=  process.env.PORT
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})




