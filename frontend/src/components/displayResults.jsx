
import react, {useEffect, useState} from 'react'
import Charts from './Charts'


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
            await fetch(`http://tfbs-backend.herokuapp.com/score/${props.matrices[i]}?sequence=${props.sequence}`)
                .then((response) => (response.json()))
                .then((response) => res[props.matrices[i]] = response['probability'])
        }
        setResponse(res)
    }


    return(
        <div>
            {loaded ? <Charts res={response}/> : <p>Laster...</p>}
        </div>
    )
}
export default DisplayResults