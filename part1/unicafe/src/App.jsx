import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './Button'
import Tittle from './Tittle'
import Statistics from './Statistics'

const App =()=>{

  const[good,setGood]= useState(0);
  const[neutral, setNeutral]= useState(0);
  const[bad,setBad]=useState(0);


  const handleGood =()=>{
      setGood(good+1);
  }

  const handleNeutral =()=>{
      setNeutral(neutral +1);

  }

  const handleBad=()=>{
    setBad(bad+1)
  }

  const suma=good+neutral+bad

  return(

    <>
      
      <Tittle tittle='Give feedback'/>
      <Button text='Good' Onclick={handleGood}/>
      <Button text='Neutral'  Onclick={handleNeutral}/>
      <Button text='Bad' Onclick={handleBad}/>
    
      <Tittle tittle='Statistics'/>
      <Statistics   cantidadGood={good} cantidadNeutral={neutral}  cantidadBad={bad} suma={suma} average={(suma)/3} positive={(good*100)/suma}/>

      
  

    </>
  )
}

export default App
