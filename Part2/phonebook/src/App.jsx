import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = ()=>{

  const[persons,setPersons]= useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const[newName,setNewName]= useState('')
  const[newPhoneNumber, setNewPhoneNumber]= useState("")
  const[nameToSearch, setNameToSearch] = useState("")

  let names= persons.map((element)=> element.name)
  
  


  const addName=(event)=>{
    event.preventDefault()
    const objName = {name:newName,number:newPhoneNumber, id: persons.length + 1}
    console.log(objName)
    names.includes(newName) ? alert( `${newName} is already addded to phonebook`) :  setPersons(persons.concat(objName))
    
    setNewName("")
    setNewPhoneNumber("")

  }

  const handleName=(event)=>{
    setNewName(event.target.value)
  }

  const handleNumberPhone = (event)=>{
    setNewPhoneNumber(event.target.value)
  }

  const handlenameToSearch = (event)=>{
      setNameToSearch(event.target.value)
  }

  const personToShow= nameToSearch ? persons.filter(person => person.name.toLocaleLowerCase().includes(nameToSearch.toLocaleLowerCase())) : persons

  return(
    <div>
      <h2>Phonebook</h2>

        <Filter  nameToSearch={nameToSearch}  handlenameToSearch={handlenameToSearch} />
      
        <h2>Add a new</h2>

        <PersonForm  addName={addName}  newName={newName}  handleName={handleName}  newPhoneNumber={newPhoneNumber} handleNumberPhone={handleNumberPhone} />


        <h2>Numbers</h2>

        <Persons personToShow={personToShow}/>
      
     </div>
  )
}

export default App
