import React, { Component }  from 'react';
import Web3 from 'web3'
import vaccine from '../abis/vaccine.json';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ProcureVaccine from './ProcureVaccine'
import CentralTable from './CentralTable'

const back1 = {
    backgroundColor: '#cfe8fc',
    // height: '100vh',
    padding: 50,
    display: 'flex',
    justifyContent: 'space-around',
}




class CentralGovn extends Component {

    async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
    }
  
    async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!0')
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        // window.alert('Non-Ethereum browser detected. You should consider trying MetaMask 1!')
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!2')
      }
    }
  
    async loadBlockchainData() {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      this.setState({ account: accounts[0] })
      const networkId = await web3.eth.net.getId()
      const networkData = vaccine.networks[networkId]
      console.log(networkId)
      console.log(networkData)
      //window.alert('new alert')

      if(networkData) {
        const delivery = new web3.eth.Contract(vaccine.abi, networkData.address)
        this.setState({ delivery })
        console.log(delivery.methods.View_Owner().call())
        console.log(delivery.methods.View_types_Count())
        const no_of_manufactures = await delivery.methods.states_count.call()
        this.setState({ no_of_manufactures })
        // Load orders
        console.log(no_of_manufactures)
        console.log(delivery.methods.getAllStatesInfo().call())
        for (var i = 1; i <= no_of_manufactures; i++) {
          const manufacturer = await delivery.methods._vaccine_types(i).call()
          this.setState({
            manufactures: [...this.state.manufactures, manufacturer]
          })
        }
        
        this.setState({ loading: false})
      } else {
        window.alert('Delivery contract not deployed to detected network.')
      }
    }
  
    constructor(props) {
      super(props)
      this.state = {
        account: '',
        no_of_manufactures: 0,
        manufactures: [],
        loading: true
      }
  
    }
  
    CentralTable() {
        return (
            <div>
                <Container maxWidth='lg' style={back1}>
                    <ProcureVaccine />
                    <Button variant="outlined" color="secondary">Register a Company</Button>

                </Container>
    
                <Container>
                    <Box m={4}>
                        manufactures = {this.state.manufactures}
                        <CentralTable />
                    </Box>
                </Container>
            </div>
        )
    }
}



export default CentralGovn;
