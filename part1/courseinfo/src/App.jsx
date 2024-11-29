import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'
import Display from './Display.jsx'
import Button from './Button.jsx'
import History from './History.jsx'

const App = (props)=>{


  //const {counter} = props;
  const [counter,setCounter]= useState(0)
  const[clicks, setClicks]= useState({plus:0, minus:0,zero:0})
  //Es un estado para recordar los clicks que suceden en la aplicacion
  const [allClicks,setAll]= useState({plusArray:[],minusArray:[]})
  //estado para mostar la cantidad de veces que se pulsan los botnes plus,zero minus
  const[total,setTotal]= useState(0);
 


  
  const increaseByOne  = ()=>{

     //   ...clicks hace una copia de lo que esta en el objeto clicks
     //Este estado guarda los click que hacen en plus
     //el mertodo concat no muta el array existente, devuelve una copia del array con el elemento agregado.
    
    setAll({...allClicks, plusArray:  allClicks.plusArray.concat('+') })
    setClicks({...clicks, plus: clicks.plus +1})
    
    setTotal(clicks.plus + clicks.minus + clicks.zero)
    setCounter(counter+1)
    

  }

  const decreaseByOne = () => {

    setTotal(clicks.plus + clicks.minus + clicks.zero)
    setAll({...allClicks, minusArray:  allClicks.minusArray.concat('-') })
    setClicks({...clicks, minus: clicks.minus +1 })    
    setCounter(counter - 1)
  }



  const zero = ()=>{
    setTotal(clicks.plus + clicks.minus + clicks.zero)
    setClicks({...clicks, zero: clicks.zero +1 })  
    setCounter(0)
  }


  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

 
  console.log("Me vuelvo a renderizar");

  return(

    <div>
      <Header course={course}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
      <Button OnClick={increaseByOne} text='PLus' />
      <Button OnClick={zero} text='Zero' />
      <Button OnClick={decreaseByOne} text='minus' />
      <Display counter={counter}  allClicks={allClicks} total={total}/>  
  </div>
  )
}

export default App
