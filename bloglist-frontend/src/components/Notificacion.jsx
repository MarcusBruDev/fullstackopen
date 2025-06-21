const Notificacion = ({messageError,messageSussess})=>{




    if(!messageSussess && !messageError){
        return null
    }

    if(messageError){
        return(
            <div className="error">
               <span id="error">{messageError}</span> 
            </div>
        )
    }
    if(messageSussess){
        return(
            <div className="sussess">
                <span id="sussess">{messageSussess}</span>
            </div>
        )
    }


}

export default Notificacion 