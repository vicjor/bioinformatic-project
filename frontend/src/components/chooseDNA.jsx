import { FormControl, TextField } from "@material-ui/core"

const ChooseDNA = (props) => {
    // TODO: validate input, bare gyldige karakterer for dna seq, riktig separering mellom dna seqs osv.
    return(
        <div>
            <br />
            <FormControl noValidate autoComplete="off" fullWidth >
                <TextField
                    id="DNAsequencesID"
                    label="Skriv inn DNA sekvenser"
                    size="medium"
                    value={props.chosenDNAsequences}
                    onChange={(e) => props.setChosenDNAsequences(e.target.value)}
                />
            </FormControl>
        </div>
    )
}
export default ChooseDNA