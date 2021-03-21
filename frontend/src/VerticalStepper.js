import React, {useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './styles/VerticalStepper.css'

import ChooseBindings from './components/chooseBindings'
import DisplayResults from './components/displayResults';
import ChooseDNA from './components/chooseDNA';


export default function VerticalStepper() {

    const [chosenMatrices, setChosenMatrices] = useState([])
    const [chosenDNAsequences, setChosenDNAsequences] = useState("")

    const [activeStep, setActiveStep] = useState(0)
    const steps = getSteps()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // TODO: Denne blir oppdatert hvis man går tilbake et step. Det bør nok endres hehe
    const getJSX = (step) => {
        switch(step){
            case 0:
                return <ChooseBindings chosenMatrices={chosenMatrices} setChosenMatrices={setChosenMatrices} />
            case 1:
                return <ChooseDNA chosenDNAsequences={chosenDNAsequences} setChosenDNAsequences={setChosenDNAsequences} />
            case 2:
                return <DisplayResults />
            default:
                return <p>Ugh. Det har oppstått en feilg</p>
        }
    }

    return(
        <div className="VerticalStepper">
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel><h3>{label}</h3></StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className="actionsContainer">
                                {getJSX(index)}
                                <br />
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className="button"
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className="button"
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </StepContent>
                    </Step>
                ))}

            </Stepper>
            <p>Litt debugging: </p>
            <p>Bindinger: {chosenMatrices.map((key, index) => key + ", ")}</p>
            <p>DNA seqs: {chosenDNAsequences}</p>
        </div>
    )
}


// TODO: Skriv om disse så de blir riktige

function getSteps() {
  return ['Velg bindinger', 'Skriv inn DNA sekvenser', 'Se resultat'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Velg hvilke matriser/bindinger du vil sjekke om det eksisterer 
              spesielle DNA sekvenser i. Du kan velge flere bindinger her. Vi 
              bør skrive noe fett her. Det som står nå er bare bull `;
    case 1:
      return `Skriv inn DNA sekvenser du vil sjekke. Du kan skrive inne flere 
              sekvenser ved å ha et komma i mellom sekvensene. Tips: du kan bruke
              random DNA generators`;
    case 2:
      return `Her er resultatet. Du ser grafer for hver binding sjekket mot hver 
              DNA sekvens om sekvensen eksisterer i bindingen. Er du ikke førnøyd 
              med resultatet, er det bare å gå tilbake å teste med noen andre 
              bindinger eller sekvenser`;
    default:
      return 'Ugh. Det har oppstått en feil';
  }
}