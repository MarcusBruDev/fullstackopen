import { useState ,useEffect} from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsRequest from './services/persons'
import Notificacion from './components/Notificacion'

const App = ()=>{

  const[persons,setPersons]= useState([])

  const[newName,setNewName]= useState('')
  const[newPhoneNumber, setNewPhoneNumber]= useState("")
  const[nameToSearch, setNameToSearch] = useState("")
  const[messageAddsuccessful, setMessageAddsuccessful]=useState(null)
  const[messageAddError, setMessageAddError]=useState(null)


  const hook = ()=>{
      personsRequest
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })
 
  }

  useEffect(hook,[]);







  let names= persons.map((element)=> element.name)
  
  


  const addName=(event)=>{
    event.preventDefault()
    const objName = {name:newName,number:newPhoneNumber}
    console.log(objName)


    persons.map(person =>{
    if(person.name === newName && newPhoneNumber !== person.number){
        if(window.confirm(`${newName} is already addded to phonebook, remplace  the old  number with a new one`)){
          console.log("Si cambiar")
          personsRequest
          .update(person.id,objName)
          .then(personUptade=> setPersons(persons.map(p=> p.id !== person.id ? p : personUptade ) ))
          .catch(error=>{
              console.log('error!')
              setMessageAddError(`Information of ${person.name} has already been removed from server ` )
              setTimeout(()=>{setMessageAddError(null)},3000)
          })

        }
      }if(person.name === newName && newPhoneNumber === person.number){
        alert( `${newName} is already addded to phonebook`)
      }
    })


    if(!names.includes(newName)){
      personsRequest
      .create(objName)
      .then(returnedData=>{
        setMessageAddsuccessful(` Added ${returnedData.name}`)
        setPersons(persons.concat(returnedData))
      })
    }

    
    setTimeout(()=>{setMessageAddsuccessful(null)},3000)
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

  const deletePersons=(id,name)=>{
    if(window.confirm(`Delete ${name}`)){
      console.log(id)
      personsRequest
      .deleted(id)
      .then(personDeleted=> setPersons(persons.filter(person=> person.id !== id)))
      .catch(error=>{
        setMessageAddError(`Information of ${name} has already been removed from server ` )
        setTimeout(()=>{setMessageAddError(null)},3000)
      })
    }
  
  }

  return(
    <div>
      <h2>Phonebook</h2>

        <Notificacion messageAddsuccessful={messageAddsuccessful} messageAddError={messageAddError}/>

        <Filter  nameToSearch={nameToSearch}  handlenameToSearch={handlenameToSearch} />
      
        <h2>Add a new</h2>

        <PersonForm  addName={addName}  newName={newName}  handleName={handleName}  newPhoneNumber={newPhoneNumber} handleNumberPhone={handleNumberPhone} />


        <h2>Numbers</h2>

        <Persons personToShow={personToShow} deletePersons={deletePersons} />
      
     </div>
  )
}

export default App
