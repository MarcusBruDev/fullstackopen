const PersonForm = (props)=>{

    return(
        <form   onSubmit={props.addName}>
            <div>name: <input value={props.newName} onChange={props.handleName}/></div>
            <div>number: <input value={props.newPhoneNumber}  onChange={props.handleNumberPhone} /></div>
            <div><button type="submit">add</button></div>
      </form>
    )
}


export default PersonForm