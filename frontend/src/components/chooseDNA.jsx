import React, { useState, useEffect } from 'react';
import { FormControl, TextField } from "@material-ui/core"

const ChooseDNA = (props) => {
    const [text, setText] = useState("")
    const [inputFieldError, setInputFieldError] = useState(false)
    

    const handleChange = (event) => {
        const nucleotides = ['a', 'c', 'g', 't', 'A', 'C', 'G', 'T']
        let input = event.target.value;
        let string = input.split("");
        for(let character of string){
            if(!nucleotides.includes(character)){
                setText("Invalid input")
                setInputFieldError(true)
                break;
            }else{
                setInputFieldError(false)
            }
        }
        props.setChosenDNAsequence(event.target.value)
    } 

    return(
        <div>
            <br />
            <FormControl noValidate autoComplete="off" fullWidth >
                <TextField
                    id="DNAsequencesID"
                    label="Skriv inn en DNA-sekvens"
                    size="medium"
                    value={props.chosenDNAsequence}
                    onChange={handleChange}
                    error={inputFieldError}
                    helperText={text === "Invalid input" ? "Only characters allowed are [a, c, g, t]" : ""}
                />
            </FormControl>
        </div>
    )
}
export default ChooseDNA;