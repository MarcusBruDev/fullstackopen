const Total =(props)=>{
   let courses=props.parts 


   let suma=courses.reduce((acumulator,currentValue)=>{
        let sumaArray= acumulator + currentValue.exercises
  
         return sumaArray
    },0)    
    
    return(
        <>
            <p><b>Total of  {suma} exercises</b></p>
           
        </>
    )
}


export default Total

