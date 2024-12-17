import axios from "axios"

const  getAll=(searchedCity)=>{
       // const baseUrl= `https://studies.cs.helsinki.fi/restcountries/api/name/${searchedCity}`
        const baseUrl= `https://studies.cs.helsinki.fi/restcountries/api/all`
        
        const request = axios.get(baseUrl)
        return request.then(response=>response.data)
}

export default { getAll }