import { useState ,forwardRef,useImperativeHandle} from "react";

const Togglable = (props,refs) => {
    //forwardRef es un hook  que puede accedera a la refeerencia que le fue asignada. en este caso en el componente App.jsx se le asigna la referencia noteFormRef a este componente Togglable, lo que permite acceder a los metodos del componente Togglable desde el componente App.jsx.
    //     //useImperativeHandle es un hook que permite personalizar la instancia del componente hijo que se pasa a la referencia
    //useState es un hook que permite manejar el estado de un componente funcional
    const [visible,setVisible]= useState(false)
    
    const hideWhenVisible = {display : visible ? 'none':''}
    const showWhenVisible = {display: visible ? '' :'none'}

    const toggleVisibility =()=>{
        setVisible(!visible)
    }

  /*  useImperativeHandle(refs, ()=>{  // se usa para exponer metodos del componente hijo a su padre, en este caso el metodo toggleVisibility
        return {
            toggleVisibility
        }
    })*/

    return(
        <div>
            <div style={hideWhenVisible}>
               
                    <button onClick={toggleVisibility}>{props.buttonLabel}</button> 
            </div>

            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
}

export default Togglable;