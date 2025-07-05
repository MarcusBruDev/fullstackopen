
import ReactDOM from 'react-dom/client'
import './index.css'

import { createStore , combineReducers} from 'redux'  // con la funcion  combineReducers podemos convinar varios estados en uno solo
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { createNote } from './reducers/noteReducer'

import App from './App.jsx'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
// aqui por ejemplo se combinan los reducers de notas y filtro
// cada reducer se encarga de una parte del estado global de la aplicacion
// el estado de las notas se guarda en notes y el estado del filtro se guarda en filter
// el estado global de la aplicacion se guarda en store
// el store es el objeto que contiene el estado global de la aplicacion

/*const store = createStore(combineReducers({
    notes: noteReducer,
    filter: filterReducer
}))*/



const store = configureStore({  // podemos desacernos del combineReducers y crear el store directamente con configureStore
  reducer:{
    notes: noteReducer,
    filter: filterReducer
  }
})

store.subscribe(()=>console.log(store.getState()))
//store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('CombineReducers forms one reducer from many simple reducers'))



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)


/*ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div />
  </Provider>
)*/

