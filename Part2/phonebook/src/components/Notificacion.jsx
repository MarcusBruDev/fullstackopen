const Notificacion = ({messageAddsuccessful,messageAddError})=>{
    if(messageAddsuccessful===null && messageAddError ===null ){
        return null
    }

    return(
      <div className={messageAddsuccessful ? 'messageAdded' : 'messageError'}>
            {messageAddsuccessful ? messageAddsuccessful : messageAddError}
      </div>
    )
}

export default Notificacion