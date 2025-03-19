const {test,after , beforeEach, describe}= require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const Note = require('../models/note')



const api = supertest(app) // se envuelve un en objeto que se llama superagent.

describe('When there is initially some notes saved',()=>{

    beforeEach(async () => {
        await Note.deleteMany({})
    
        for(let note of helper.initialNotes){
            let noteObject = new Note(note)
            await noteObject.save()
        }
    })

    test('notes are returned as json',async ()=>{
        await api 
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type',/application\/json/ )
    })

    test('All notes are returned',async ()=>{
        const response = await api.get('/api/notes')
        assert.strictEqual(response.body.length, helper.initialNotes.length)
    })
    

    test('A specific note is within the returned notes',async ()=>{
        const response= await api.get('/api/notes')
        const contens  = response.body.map(note=>note.content)

        assert(contens.includes('Browser can execute only JavaScript'))
    })

    describe('Viewing a specific note',()=>{
        
        test('Succeds with a valid id',async ()=>{
            const noteAtStart= await helper.notesInDb()

            const noteToView = noteAtStart[0]

            const resultNote = await api
                .get(`/api/notes/${noteToView.id}`)
                .expect(200)
                .expect('Content-type',/application\/json/)

            assert.deepStrictEqual(resultNote.body,noteToView)
        })


        test('Fails with statuscode 404 if note does not exist',async ()=>{
            const validNonexistingId = await helper.nonExistingId()
            await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404)
        })

        test('Fails with statuscode 400 id is invalid',async ()=>{

            const invalidId= '5a3d5da59070081a82a3445'

            await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
        })

    })

    describe('Addition of a new note',()=>{

        test('Succes with valid data',async ()=>{
            const newNote={
                content:'async/await simplifies making async calls',
                important: true
            }

            await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            const notesAtEnd= await helper.notesInDb()
            assert.strictEqual(notesAtEnd.length,helper.initialNotes.length+1)

            const contents = notesAtEnd.map(note=> note.content)
            assert(contents.includes('async/await simplifies making async calls'))
        })



        test('Fails with status code 400 if data invalid',async ()=>{

            const newNote={
                important:true
            }

            await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)

            const notesAtEnd = await helper.notesInDb()

            assert.strictEqual(notesAtEnd.length , helper.initialNotes.length)

        })

    })

    describe('Deletion of a note',()=>{
        
        test('Succeeds with status code 204 if id is valid',async ()=>{
            const notesAtStart= await helper.notesInDb()
            const noteToDelete = notesAtStart[0]
            
            await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)

            const notesAtEnd= await helper.notesInDb()

            assert.strictEqual(notesAtEnd.length, helper.initialNotes.length -1)
            
            const contents = notesAtEnd.map(note => note.content)
  
            assert(!contents.includes(noteToDelete.content))


        })

    })

    


})


    



/*test('There are two notes' ,async ()=>{
  
    const notesAtEnd = await helper.notesInDb()
    
    assert(notesAtEnd.length,helper.initialNotes.length)
    console.log(notesAtEnd.length)
})



test('The first note is about HTTP methods',async ()=>{
    

    const notesAtEnd = await helper.notesInDb()
    const contents = notesAtEnd.map(e => e.content)
   
    assert(contents.includes('HTML is easy'))
})


test('A valid note can be added',async ()=>{
    const newNote = {
        content: 'Async/await simplifies making async calls',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
  
    const notesAtEnd = await helper.notesInDb()

    assert(notesAtEnd.length,helper.initialNotes.length +1)



    const contents = notesAtEnd.map(element=>element.content)
    assert(contents.includes('Async/await simplifies making async calls'))
})

test('Note without content is not added', async ()=>{
    const newNote={
        important:true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)


    const notesAtEnd = await helper.notesInDb()
    assert(notesAtEnd.length, helper.initialNotes.length)
})


test('A specific note can be viewed',async ()=>{
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]
    


    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type' , /application\/json/)

    
    assert(resultNote.body, noteToView)
})


test('A note can be deleted', async ()=>{
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]


    await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

    const notesAtEnd= await helper.notesInDb()
    const contents = notesAtEnd.map(element=>element.content)

    assert(!contents.includes(noteToDelete.content))
    assert(notesAtEnd.length,helper.initialNotes.length -1)
})*/



after(async ()=>{
    await mongoose.connection.close()
})
