const notesRouter = require('express').Router()

const jwt = require('jsonwebtoken')


//const { request } = require('../app')
const Note = require('../models/note')
const User = require('../models/user')


const getTokenFrom = request=>{
   
    const authorization = request.get('authorization')
    
    if(authorization && authorization.startsWith('Bearer ')){
        return authorization.replace('Bearer ','')

    }

    return null
}


notesRouter.get('/',async (request,response)=>{

    const notes = await Note.find({}).populate('userId',{userName:1,name:1})
    response.json(notes)
    
})

notesRouter.get('/:id', async (request,response,next)=>{
    

    const note  = await Note.findById(request.params.id)

    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
  
 
})


notesRouter.post('/', async (request,response,next)=>{
    
    const body = request.body
    // console.log('Data del body',body)
    // objeto decodificado tiene el cambo userName y id
    const decodedToken = jwt.verify(getTokenFrom(request),process.env.SECRET)
    
    if(!decodedToken.id){
        return response.status(401).json({error: 'token invalid'})
    }


    const user = await User.findById(decodedToken.id)
    
    
    const note= new Note({
        content: body.content, 
        important: body.important || false,  
        userId: user._id
    })

   

    try{
        const savedNote = await note.save()
        user.notes= user.notes.concat(savedNote._id)
        await user.save()
        response.status(201).json(savedNote)
    }catch(exeption){
        next(exeption)
    }
   

   
})

notesRouter.delete('/:id', async (request,response,next)=>{

    // aqui podemos ver la magia dek express-async-errors , se elimina los bloques de try/catch
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

notesRouter.delete('/', async (request,response,next)=>{

    // aqui podemos ver la magia dek express-async-errors , se elimina los bloques de try/catch
    await Note.deleteMany({})
    response.status(204).end()

})


notesRouter.put('/:id',(request,response,next)=>{
        const body= request.body

        const note={
            content: body.content,
            important: body.important,
        }

        Note.findByIdAndUpdate(request.params.id,note,{new:true})
        .then(updatedNote=>{
            response.json(updatedNote)
        })
        .catch(error=>{
            next(error)
        })
})


module.exports= notesRouter