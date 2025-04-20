const Notificacion = ({messageError,messageSussess})=>{




    if(!messageSussess && !messageError){
        return null
    }

    if(messageError){
        return(
            <div className="error">
                {messageError}
            </div>
        )
    }
    if(messageSussess){
        return(
            <div className="sussess">
                {messageSussess}
            </div>
        )
    }


}

export default Notificacion 