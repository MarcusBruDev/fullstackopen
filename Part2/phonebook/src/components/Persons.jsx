

const Persons =(props)=>{

    return(
        <>
              {props.personToShow.map((element)=>{
                return <p key={element.id}>{element.name} : {element.number}  <button onClick={()=>props.deletePersons(element.id,element.name)}>Delete</button></p>
                })}
        
        </>
    )
}


export default Persons