import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Home from './Home'
import CentralGovn from './CentralGovn'
import Temp from './temp'
import StateGovn from './StateGovn'
import BeneficiaryLogin from './BeneficiaryLogin'
import BeneficiarySignup from './BeneficiarySignup';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loginPage, setLoginPage] = React.useState(true);

  let loginComponent

  if (loginPage) {
    loginComponent = <BeneficiaryLogin setLoginPage={setLoginPage} />
  }
  else {
    loginComponent = <BeneficiarySignup setLoginPage={setLoginPage} />

  }

  return (
    <div className={classes.root}>
      {/* <Container>
        COVID TRACKER
      </Container> */}

      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >

          <LinkTab label="Home" />
          <LinkTab label="Central Govn" />
          <LinkTab label="State Govn" />
          <LinkTab label="Vaccine Company" />
          <LinkTab label="Beneficiary" />
          <LinkTab label="Medical Centre" />
          <LinkTab label="form" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CentralGovn />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <StateGovn />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Vaccine Company
      </TabPanel>
      <TabPanel value={value} index={4}>
        {loginComponent}
      </TabPanel>
      <TabPanel value={value} index={5}>
        Medical Centre
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Temp />
      </TabPanel>
    </div>
  );
}
