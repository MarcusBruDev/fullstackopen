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


 



  //Names of the persons in the phonebook
  let names= persons.map((element)=> element.name)
  
  // function to add a new name to the phonebook
  const addName=(event)=>{
    //prevent the default action of the form
    event.preventDefault()
    // object with the name and the number of the person new
    const objName = {name:newName,number:newPhoneNumber}
    //console.log(objName)

    //check if the name is already in the phonebook
    persons.map(person =>{
      //if the name is already in the phonebook and the number is different, allow the user to change the number
      if(person.name === newName && newPhoneNumber !== person.number){
          // confirm if the user wants to change the number
          if(window.confirm(`${newName} is already addded to phonebook, remplace  the old  number with a new one`)){
            // personsRequest is a object with the methods to make the request to the server
            console.log(typeof person.id)
            personsRequest
            //update the number of the person
            .update(person.id,objName)
            // control the response of the server
            // modify the state of the persons
            .then(personUptade=> setPersons(persons.map(p=> p.id !== person.id ? p : personUptade ) ))
            //controlle the error of the server
            .catch(error=>{
                console.log('error!')
                setMessageAddError(`Information of ${person.name} has already been removed from server ` )
                setTimeout(()=>{setMessageAddError(null)},3000)
            })

          }
          //if the user name and phone number are the same, alert the user, the name is already in the phonebook
        }if(person.name === newName && newPhoneNumber === person.number){
          alert( `${newName} is already addded to phonebook`)
        }
    })


    // si el nombre no esta en el phonebook, añadirlo
    if(!names.includes(newName)){
      
      personsRequest
      .create(objName)
      .then(objName=>{
        //console.log('Hello')
        //console.log(objName[objName.length - 1])
        console.log(objName.name)
        setMessageAddsuccessful(` Added ${objName.name}`)
        setPersons(persons.concat(objName))
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
      console.log('Hello')
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
