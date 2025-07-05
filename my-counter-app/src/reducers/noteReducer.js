import  { createSlice, current } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]


const generateId = ()=> Number((Math.random()* 1000000).toFixed(0))


//Se puede decir que createSlice de la libreria redux toolkit tiene las funciones creadorras y almismo tiemoo cambian los estados
const noteSlice = createSlice({
    name: 'notes',  // define un tipo de accion, es unico para cada reducer createNote definida más adelante tendrá el valor de tipo notes/createNote
    initialState,  //define el estado ininical del reducer
    reducers: {  // este es el reducer
        createNote(state, action) {  // funciones creadoras del reducer
            const content= action.payload
            state.push({
                content,
                important: false,
                id: generateId(),
            })
        },

        
        toggleImportanceOf(state, action) { // funciones creadoras del reducer
           
            const id = action.payload
            const noteToChange = state.find(n=> n.id === id)
            const changedNote = {...noteToChange, important: !noteToChange.important }
            console.log(current(state))
            return state.map(note => note.id !== id ? note : changedNote)
        }
    }
})



export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer







/*const noteReducer = (state = initialState , action) => {

  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { ...noteToChange, important: !noteToChange.important }
      return state.map(note => note.id !== id ? note : changedNote)
    default:
      return state
  
  }
  
}








export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer*/