import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header.jsx'
import Content from './Content.jsx'
import Total from './Total.jsx'
import Display from './Display.jsx'
import Button from './Button.jsx'

const App = (props)=>{


  //const {counter} = props;
  const [counter,setCounter]= useState(0);
   
  const increaseByOne  = ()=>{
    setCounter(counter+1)
  }

  const decreaseByOne = () => setCounter(counter - 1)

  const zero = ()=>{
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
      <Button onClick={increaseByOne} text='PLus' />
      <Button onClick={zero} text='Zero' />
      <Button onClick={decreaseByOne} text='minus' />
      <Display  counter={counter}/>
  </div>
  )
}

export default App
