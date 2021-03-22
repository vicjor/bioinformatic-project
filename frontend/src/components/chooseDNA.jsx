import { FormControl, TextField } from "@material-ui/core"

const ChooseDNA = (props) => {
    // TODO: validate input, bare gyldige karakterer for dna seq, riktig separering mellom dna seqs osv.
    // TODO: VIKTIG: vi har endret så man kun kan skrive inn 1 sequence, så kanskje lurt å gå over å fikse navngivning osv.
    return(
        <div>
            <br />
            <FormControl noValidate autoComplete="off" fullWidth >
                <TextField
                    id="DNAsequencesID"
                    label="Skriv inn en DNA sekvense"
                    size="medium"
                    value={props.chosenDNAsequences}
                    onChange={(e) => props.setChosenDNAsequences(e.target.value)}
                />
            </FormControl>
        </div>
    )
}
export default ChooseDNA