import { useState,useEffect } from 'react'
import './App.css'
import countries from './services/countries'
import Display from './components/Display'
import climate from './services/climate'

function App() {

  const[countriesState,setcountriesState]=useState(null)
  const[clima, setClima]=useState(null)
  const[searchedCity,setSearchedCity] = useState('')
  const api_key = import.meta.env.VITE_SOME_KEY
  


  
  const countrieToShow =  searchedCity ? countriesState.filter((element)=>element.name.common.toLocaleLowerCase().includes(searchedCity.toLocaleLowerCase())) : []

  const hook = ()=>{

    if(!countriesState){
      
      countries
      .getAll()
      .then(response=>{
        setcountriesState(response)
      })
    }
 

    if(countrieToShow.length===1){
      climate
      .gelAllClimate(countrieToShow[0].name.common,api_key)
      .then(response=>setClima(response))
    }
  

  }

  
  useEffect(hook,[searchedCity])
  

  const handlesearchedCity =(event)=>{
      setSearchedCity(event.target.value)
  }

  if(!countriesState){
    return
  }


  

  

  return (
    <>
      <form>
        Find countries: <input value={searchedCity} onChange={handlesearchedCity}></input>
      </form>
      <Display countrieToShow={countrieToShow} clima={clima} />
     
    </>
  )
}

export default App
