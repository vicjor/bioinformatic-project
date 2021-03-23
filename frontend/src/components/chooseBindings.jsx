import React, { useState, useEffect } from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';

const URL = "http://tfbs-backend.herokuapp.com/";
/*
if (process.env.NODE_ENV === "development") {
    URL = process.env.REACT_APP_URL;
    console.log(URL);
} else {
    URL = "http://tfbs-backend.herokuapp.com/";
}
*/
const ChooseBindings = (props) => {
    const [matrices, setMatrices] = useState(0)

    useEffect(() => {
        if(matrices === 0){
            get_data(`${URL}matrices`, setMatrices)
        }
    },[])

    const get_data = (url, setResponse) => {
        fetch(url)
            .then((response) => response.json())
            .then((response) => {setResponse(response)})
    }

    function handleChange(value){
        props.setChosenMatrices(value);
    }


    // TODO: Denne bruker alt for lang tid på å åpne. Bedre å bruke autocomplete, https://material-ui.com/components/autocomplete/
    // bør ideelt kunne søke, men det er sikkert ikke så veldig nøye hvis det er stress å fikse
    return(
        <div>
            <br />
            { matrices !== 0 ? 
            <FormControl fullWidth>
                 <Autocomplete
                id="choose-binding-label"
                options={matrices['matrices_ids'].sort()}
                style={{ width: 300 }}
                onChange={(event, value) => handleChange(value)}
                value={props.chosenMatrices}
                multiple
                renderInput={(params) => <TextField {...params} label="Velg bindinger" variant="outlined" />}
                />
            </FormControl>
            : <p>Laster...</p>}
        </div>
    )
}

export default ChooseBindings

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
