const Filter =(props)=>{

    return(
        <div>filter shown with <input value={props.nameToSearch} onChange={props.handlenameToSearch}/></div>
    )
}

export default Filter