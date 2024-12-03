
import Part from "./Part.jsx";
import Header from "./Header.jsx";
import Total from "./Total.jsx";


const Content = (props)=>{
    
    const partes = props.parts
   
   
    
  

    
    return(

        <>
         {partes.map((element,index)=>{
                  return (
                    <div key={element.id}>
                        <Header key={element.id} name={element.name}/>
                        <Part parts={element.parts} />
                        <Total parts={element.parts}/>
                    </div>
                  ) 
         })}
        </>

    )
}

export default Content;


/*{partes.map(part => 
    <Part key={part.id} part={part.name}  exercises={part.exercises}/>
)}*/




