import './styles/App.css';
import VerticalStepper from './VerticalStepper'

import React from 'react';
import { Grid } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>Mapping known transcription factor binding sites</h3>
      </header>
      <Grid 
        container
        direction="column"
        alignItems="center"
      >
        <Grid xs={8}>
          <VerticalStepper />
        </Grid>
      </Grid>
      
      <footer style={{"marginBottom": "20px"}}> <small>&copy; Copyright 2021, Gutta Consulting HQ</small> </footer>
    </div>
  );
}

export default App;
