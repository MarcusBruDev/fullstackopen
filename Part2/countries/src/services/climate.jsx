
import axios from "axios";


const gelAllClimate = (countrie,api_key)=>{
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countrie}&APPID=${api_key}`
    const request = axios.get(baseUrl)
    return request.then(response=>response.data)
}


export default {gelAllClimate}