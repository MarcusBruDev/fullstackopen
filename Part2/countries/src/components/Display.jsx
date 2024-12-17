

const Display = ({countrieToShow,clima})=>{

    
 
   
    if(countrieToShow.length==1){
        console.log(clima)
        const temp =  clima ?  clima.main.temp : null
        const wind =  clima ?  clima.wind.speed   : null
        const icon =  clima ?  clima.weather[0].icon  : null

        return(
            <>
                <h1>{countrieToShow[0].name.common}</h1>
                {countrieToShow[0].capital.map(element=><p key={element}>Capital: {element}</p>)}
                <p>Area: {countrieToShow[0].area}</p>
                <h2>Lenguages:</h2>
                <ul>
                    {Object.values(countrieToShow[0].languages).map(element=><li key={element}>{element}</li>)
                    }
                </ul>
                <img src={countrieToShow[0].flags.png} alt={countrieToShow[0].flags.alt}/>
                <p>Temperatura {temp} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${icon}.png`} />
                <p>Wind {wind} m/s</p>
                
            </>
        )
    }

    if(countrieToShow.length < 10){

        return(
            <>
                {countrieToShow.map(element=>  <p key={element.name.common}>{element.name.common}</p>)}
            </>
        )
    }else{
        return <p>Too many matches, specify another filter</p>
    }


}

export default Display