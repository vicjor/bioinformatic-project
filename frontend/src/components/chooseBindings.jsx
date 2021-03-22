import React, { useState, useEffect } from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

let URL;
if (process.env.NODE_ENV === "development") {
    URL = process.env.REACT_APP_URL;
    console.log(URL);
} else {
    URL = "http://tfbs-backend.herokuapp.com/";
}

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
    
    const handleChange = (event) => {
        props.setChosenMatrices(event.target.value);
    };

    // TODO: Denne bruker alt for lang tid på å åpne. Bedre å bruke autocomplete, https://material-ui.com/components/autocomplete/
    // bør ideelt kunne søke, men det er sikkert ikke så veldig nøye hvis det er stress å fikse
    return(
        <div>
            <br />
            { matrices !== 0 ? 
            <FormControl fullWidth>
                <InputLabel id="choose-binding-label">Velg bindinger</InputLabel>
                <Select
                    labelId="choose-binding-select-label"
                    id="choose-binding-select"
                    multiple
                    value={props.chosenMatrices}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                     {matrices['matrices_ids'].map((key, index) => (
                         <MenuItem key={key} value={key}>
                             <Checkbox checked={props.chosenMatrices.indexOf(key) > -1} />
                             <ListItemText primary={key} />
                         </MenuItem>
                     ))}

                </Select>
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
