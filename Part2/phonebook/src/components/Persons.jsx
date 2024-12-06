

const Persons =(props)=>{

    return(
        <>
              {props.personToShow.map((element)=>{
                return <p key={element.id}>{element.name} : {element.number}</p>
                })}
        
        </>
    )
}


export default Persons