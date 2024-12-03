const History =({allClicks})=>{
        if(allClicks.plusArray.length ===0){
            return(
                <>
                    <p>Please click on boton PLUS</p>
                </>
            )

        }else if(allClicks.minusArray.length ===0){
            return(
                <>
                    <p>Please click on boton MINUS</p>
                </>
            )

        }
}


export default History;