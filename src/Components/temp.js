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
      const company = await delivery.methods.getAllvaccineInfo().call()
      this.setState({ company })
      const district = await delivery.methods.getAllDistrictInfo().call()
      this.setState({ district })
      console.log(company)
      console.log(district)
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
        company:[],
        district:[],
        loading: true
    }

    this.register_state = this.register_state.bind(this)
    this.update_state = this.update_state.bind(this)
    this.register_company = this.register_company.bind(this)
    this.vaccine_registration = this.vaccine_registration.bind(this)
    this.place_order = this.place_order.bind(this)
    this.register_district = this.register_district.bind(this)
    this.register_benificiary = this.register_benificiary.bind(this)

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

  register_company(period,temp_min,temp_max,name,company_add) {
    this.setState({ loading: true })
    this.state.delivery.methods.register_company(period,temp_min,temp_max,name,company_add).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  vaccine_registration(company_id,batch,time,cur_temp) {
    this.setState({ loading: true })
    this.state.delivery.methods.vaccine_registration(company_id,batch,time,cur_temp).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  place_order(company_id,newOrder) {
    this.setState({ loading: true })
    this.state.delivery.methods.place_order(company_id,newOrder).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }


  register_district(name,district_add) {
    this.setState({ loading: true })
    this.state.delivery.methods.register_district(name,district_add).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  update_district_allocation(district_id,newOrder) {
    this.setState({ loading: true })
    this.state.delivery.methods.update_district_allocation(district_id,newOrder).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  register_benificiary(record_hash) {
    this.setState({ loading: true })
    this.state.delivery.methods.register_benificiary(record_hash).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  // verifyVaccine(id) {
  //   this.setState({ loading: true })
  //   this.state.delivery.methods.verifyVaccine(id).send({ from: this.state.account })
  //   .once('receipt', (receipt) => {
  //     this.setState({ loading: false })
  //   })
  // }

  



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

                    company = {this.state.company}
                    district = {this.state.district}


                    register_state = {this.register_state}
                    update_state = {this.update_state}

                    register_district = {this.register_district}
                    update_district_allocation  = {this.update_district_allocation}

                    register_company = {this.register_company}
                    vaccine_registration = {this.vaccine_registration}
                    place_order = {this.place_order}

                    register_benificiary = {this.register_benificiary}
                    //verifyVaccine = {this.verifyVaccine}
                    
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