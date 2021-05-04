import React from 'react'
import { isCompositeComponentWithType } from 'react-dom/test-utils'
import VaccineBack from '../Images/back1.jpg'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const backStyle1 = {
    backgroundImage: `url(${VaccineBack})`,
    height: 500,
    color: 'white',
    padding: 20,
}

const backStyle2 = {
    backgroundColor: "#3f51b5",
    height: 500,
    color: 'white',
    padding: 45,
    fontSize: 24,
}

function Home() {
    return (
        <div>
            <div style={backStyle1}>
                <Box p={2}>
                    <Typography variant="h3">
                        Covid Tracker
                    </Typography>
                </Box>
            </div>

            <div style={backStyle2}>
                How it works -
            </div>
        </div>
    )
}

export default Home
