import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
      },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: 'red',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function ProcureVaccine() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleOpen}>Procure from Company</Button>
            <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper1}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <div className={classes.paper}>
                                    <Avatar className={classes.avatar}>
                                        <LocalHospitalOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Procurement
                                    </Typography>
                                    <form className={classes.form} noValidate>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-label">Vaccine Manufacturer</InputLabel>

                                            <Select
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="company"
                                                value={age}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Company 1</MenuItem>
                                                <MenuItem value={20}>Company 2</MenuItem>
                                                <MenuItem value={30}>Company 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="no_doses"
                                            label="No of Doses"
                                            type="number"
                                            id="no_doses"
                                        />
                                        {/* <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        /> */}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Request
                                        </Button>
                                        
                                    </form>
                                </div>
                                
                            </Container>
                        </div>

                    </Fade>
                </Modal>
        </div>
    )
}

export default ProcureVaccine
