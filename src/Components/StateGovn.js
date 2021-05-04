import React from 'react'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ProcureVaccine from './ProcureVaccine'
import StateTable from './StateTable'

const back1 = {
    backgroundColor: '#cfe8fc',
    // height: '100vh',
    padding: 50,
    display: 'flex',
    justifyContent: 'space-around',
}
function StateGovn() {
    return (
        <div>
            <div>
            <Container maxWidth='lg' style={back1}>
                {/* <ProcureVaccine /> */}
                <Button variant="outlined" color="secondary">Register Medical Centre</Button>
                <Button variant="outlined" color="secondary">Suppy to Medical Centre</Button>

            </Container>

            <Container>
                <Box m={4}>
                    <StateTable />
                </Box>
            </Container>
        </div>
        </div>
    )
}

export default StateGovn
