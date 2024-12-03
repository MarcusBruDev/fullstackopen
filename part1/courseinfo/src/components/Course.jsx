import Header from "./Header"
import Content from "./Content"
import Total from "./Total"


const Course = (props)=>{
    
    return(
        <>
            <Content parts={props.course} />
        </>
    )
}

export default Course