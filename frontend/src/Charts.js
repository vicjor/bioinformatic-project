import react from 'react'
import GoogleChart from 'react-google-charts'

function Charts(){

    // TODO: Create input forms
    // TODO: Fetch data from API

    const response = {
        "MA0259.1": [
            [
            -14.812621405037628, 
            -20.675181611314915, 
            -17.827577686855214, 
            -15.913445025259069, 
            -8.094504183563444, 
            -14.05481573460232, 
            -3.1505030706853687
            ], 
            [
            -20.417629149056417, 
            -2.4698634982536305, 
            -20.551621241214264, 
            -2.585598079698805, 
            -10.88995007833208, 
            -14.431171501588192
            ]
        ], 
        "MA0634.1": [
            [
            -5.960498203216035, 
            -0.7517884934339927, 
            -1.8468680716214383, 
            -7.299948055539354, 
            -7.426125399814672
            ], 
            [
            -14.613935130433646, 
            -16.551066977433567, 
            -0.5968730770574319, 
            -8.364410464916883
            ]
        ]
        }


    // Key = MA0634.1
    // Array = -14.6235235.....
    
    const create_data_table = (array, key, seq_num) => {
        let minValue = 0
        let title = `Resultat: Binding ${key} eksisterer i sekvens nr ${seq_num}`
        const data = [["header1", "Value"]]
        for(let i = 0; i < array.length; i++){
            data.push([i, array[i]])
            if(minValue > array[i]){
                minValue = array[i] - 2
            }
        }
        return(
            <GoogleChart 
                chartType="BarChart" 
                width="100%" 
                height="400px" 
                data={data} 
                options={{
                    title: title, 
                    chartArea: { width: '50%'},
                    hAxis: {title: 'Score', minValue: minValue},
                    vAxis: {title: 'Position', minValue: 0, maxValue: array.length - 1}
                }}
                rootProps={{ 'data-testid': '1' }}
                />
        )
    }

    return(
        <div>
            {Object.keys(response).map((key, index) => 
                response[key].map((array, index) => (
                    create_data_table(array, key, index+1)
                ))
            )}
        </div>
    )
}
export default Charts;