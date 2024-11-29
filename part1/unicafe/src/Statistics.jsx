import StatisticLine from "./StatisticLine"

const Statistics=(props)=>{

    const suma = props.suma
    const cantidadGood = props.cantidadGood
    const cantidadNeutral = props.cantidadNeutral
    const cantidadBad= props.cantidadBad
    const average= props.average
    const positive= props.positive


    if(suma>0){
        return(
            <>
                <table>
                    <tbody>
                        <tr>
                            <th>Descripción</th>
                            <th>Calificación</th>
                        </tr>
                        <tr>
                            <td><StatisticLine text='Good' /></td>
                            <td><StatisticLine value={cantidadGood} /></td>
                        </tr>
                        <tr>
                            <td><StatisticLine text='Neutral' /></td>
                            <td><StatisticLine value={cantidadNeutral} /></td>
                        </tr>
                        <tr>
                            <td><StatisticLine text='Bad' /></td>
                            <td><StatisticLine value={cantidadBad} /></td>
                        </tr>
                        <tr>
                            <td><StatisticLine text='Average' /></td>
                            <td><StatisticLine value={average} /></td>
                        </tr>
                        <tr>
                            <td><StatisticLine text='Positive' /></td>
                            <td><StatisticLine value={positive} /></td>
                        </tr>
                    </tbody>
                </table>

            </>
        )

    }else{
        return(
            <>
                <p>No feedback given</p>
            </>
        )
    }

}


export default Statistics;