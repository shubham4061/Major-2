import React, { Component } from 'react';
import Web3 from 'web3'
import vaccine from '../abis/vaccine.json';
import Navbar from './Navbar'
import Main from './Main'

class temp extends Component {

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
      const states_count = await delivery.methods.states_count.call()
      this.setState({ states_count })
      const states = await delivery.methods.getAllStatesInfo().call()
      this.setState({ states })
      // Load states
      //console.log(delivery.methods.getAllStatesInfo().call())
      
      this.setState({ loading: false})
    } else {
      window.alert('Delivery contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
        account: '',
        states_count: 0,
        states: [],
        loading: true
    }

    this.register_state = this.register_state.bind(this)
    this.update_state = this.update_state.bind(this)

  }

  register_state(state_name,state_add) {
    this.setState({ loading: true })
    this.state.delivery.methods.register_state(state_name, state_add).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }


  update_state(state_id,new_order) {
    this.setState({ loading: true })
    this.state.delivery.methods.update_state(state_id, new_order).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }



  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main

                    states = {this.state.states}
                    states_count = {this.state.states_count}

                    register_state = {this.register_state}
                    update_state = {this.update_state}
                    />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default temp;