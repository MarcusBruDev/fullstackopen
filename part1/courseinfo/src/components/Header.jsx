const Header =(props)=>{
    
    const array= props.parts
  
    return(

        <>
           
            <h2>{props.name}</h2>
            
        </>
    )


}


export default Header


/*{array.map((elment)=>{
    return <h2 key={elment.id}>{elment.name}</h2>
})}*/