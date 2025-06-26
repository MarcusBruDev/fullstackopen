import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer";

///hello part6
const Anecdote =({anecdote,handleClick})=>{
    return(
        <>
             <div>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={handleClick}>vote</button>
                </div>
            </div>
        
        </>
    )

}



const AnecdoteList = ()=>{
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    return(
        <>
           {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
               <Anecdote 
                   key={anecdote.id}    
                   anecdote={anecdote}
                   handleClick={() => dispatch(vote(anecdote.id))}
                />
            )}
        </>
    )
}

export default AnecdoteList;