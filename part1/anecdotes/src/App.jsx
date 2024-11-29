import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const App=()=>{
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', //6 2
    'The only way to go fast, is to go well.',  //7 
    'Marcus Bru is a very good programmer'
  ];

  const [selected,setSelected]= useState(0);
  const[vote , setVote]=useState({});


  let maxValue = Math.max(...Object.values(vote).flat());
  let indice=[...Object.values(vote).flat()].indexOf(maxValue)
  let keys= [...Object.keys(vote).flat()]






  const getRandomNum=()=>{
    setSelected(Math.floor(Math.random()*anecdotes.length)) 
  }


  const handleVote =(clave)=>{ 
      setVote({...vote, [selected]:   vote[selected] == undefined  ?  vote[selected]=1 : vote[selected]+1});
  }





  





  return(
    <>
     <h1>Anecdote of the day</h1>
     <p>{anecdotes[selected]}</p>
     <p>Has {vote[selected]==undefined ? 0 : vote[selected] } votes</p>
     <button onClick={handleVote}>Vote</button>
     <button onClick={getRandomNum}>next anecdotes</button>
     <h1>Anecdote with most votes </h1>
     <p>  {vote[keys[indice]]>0 ? anecdotes[keys[indice]] : ""}</p>
     <p>  {vote[keys[indice]]>0 ? "Has "+ vote[keys[indice]]  +" Votes": "There are not  anecdotes with votes"}</p>
    </>
  )
}

export default App
