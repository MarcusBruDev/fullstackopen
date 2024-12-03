const Part = (props)=>{
    const parts=  props.parts

    return(
        <>
            {parts.map(part=><p key={part.id}>{part.name} {part.exercises} </p>)}
        </>
    )
}


export default Part

//<p>{props.part} {props.exercises}</p>