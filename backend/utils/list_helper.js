const dummy  = (blogs)=>{
    return 1
}

const totallikes = (listPublications)=>{
    let suma=[]
    listPublications.forEach(element=> suma.push(element.likes))
    console.log(suma.reduce((acumulador,valorActual)=>acumulador+valorActual)   )
    return suma.reduce((acumulador,valorActual)=>acumulador+valorActual)
}



const favoriteBlog = (listPublications)=>{
  return  listPublications.reduce((max,obj)=>{
        return (obj.likes> max.likes) ? obj : max
    })
}


//Function recive a array of authors and counts the number of times an element appears in the array
const contar =(authors)=>{
  return  authors.reduce((max ,obj)=>{
        max[obj] = (max[obj] || 0) +1;
        return max 
    },{})
}



const mostBlogs = (listPublications)=>{
    let authors=[]
    listPublications.forEach(element=>authors.push(element.author))
    let obj = contar(authors)

    return Object.entries(obj).reduce((max,[author,blogs])=>{
        if(blogs > max.blogs){
            return {author,blogs}
        }
        return max
            
    },{author:null,blogs:-Infinity})
}





let mostLikes=(listPublications)=>{
    let authors=[]
    listPublications.forEach(element=> authors.push([element.author,element.likes]))

    return Object.entries(authors.reduce((acumulator,actual)=>{
    

        if(acumulator.hasOwnProperty(actual[0])){
            acumulator[actual[0]]  = acumulator[actual[0]]+actual[1]      
        }else{
            acumulator[actual[0]]  = actual[1]
        }
        acumulator[actual[0]] = (acumulator[actual[0]] || actual[1])   
      
        
        
        return acumulator
        
    },{})).reduce((max,[author,likes])=>{
        if(likes > max.likes){
            return {author,likes}
        }
        return max
            
    },{author:null,likes:-Infinity})

}




module.exports={
    dummy,
    totallikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}