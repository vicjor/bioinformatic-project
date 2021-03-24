
import react, {useEffect, useState} from 'react'
import Charts from './Charts'

const URL = "http://tfbs-backend.herokuapp.com/"
/*
if (process.env.NODE_ENV === "development") {
    URL = process.env.REACT_APP_URL;
    console.log(URL);
} else {
    URL = "http://tfbs-backend.herokuapp.com/";
}
*/

const DisplayResults = (props) => {
    const [response, setResponse] = useState()
    const [loaded, setLoaded] = useState(false)
    
    

    useEffect(() => {
        fetch_scores()
    }, [])


    useEffect(() => {
        setLoaded(true)
    },[response])

    async function fetch_scores(){
        let res = {}
        for(let i = 0; i < props.matrices.length; i++){
            await fetch(`${URL}score/${props.matrices[i]}?sequence=${props.sequence}`)
                .then((response) => (response.json()))
                .then((response) => res[props.matrices[i]] = response['score'])
        }
        setResponse(res)
    }


    return(
        <div>
            {loaded ? <Charts res={response} sequence={props.sequence}/> : <p>Laster...</p>}
        </div>
    )
}
export default DisplayResults