import { filterChange } from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";


const VisibilityFilter = ()=>{
    const dispatch = useDispatch();

    return(
        <>
        <div>
          {/* dado que los botones tienen el mismo nombre, solo uno puede estar seleccionado a la vez */}
          <input type='radio' id='all' name='filter' value='ALL' onChange={e => dispatch(filterChange(e.target.value))}></input>
          <label htmlFor='all'>All</label>
          <input type='radio' id='important' name='filter' value='IMPORTANT' onChange={e => dispatch(filterChange(e.target.value))}></input>
          <label htmlFor='important'>Important</label>
          <input type='radio' id='noimportant' name='filter' value='NOIMPORTANT' onChange={e => dispatch(filterChange(e.target.value))}></input>
          <label htmlFor='noimportant'>No important</label>
        </div>
     
        </>
    )

}

export default VisibilityFilter