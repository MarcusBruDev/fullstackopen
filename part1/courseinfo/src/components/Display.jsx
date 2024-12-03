const Display = ({counter,allClicks,total})=>{
 
    console.log("Renderizo componente display")
    return(
        <>
                <div>{counter}</div>
                <p>PLUS: {allClicks.plusArray.join(' ') /*join une trodo el string y agrega un caracter entyre los elementos del array*/ }</p>
                <p>MINUS: {allClicks.minusArray.join(' ') /*join une trodo el string y agrega un caracter entyre los elementos del array*/ }</p>
                <p>Total de click {total}</p>
        </>
    )

}


export default Display

