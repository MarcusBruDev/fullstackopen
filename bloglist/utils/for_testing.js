const reverse = (string)=>{
        return string
                .split('')
                .reverse()
                .join('')
}


const average = (array)=>{
        return array.length ===0
        ? 0
        : array.reduce((accumulator, currentValue)=>accumulator+currentValue) / array.length
}


module.exports ={
    reverse,
    average
}

