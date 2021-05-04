import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        

        <h1>Register state</h1>
        <form onSubmit={(event) => {

          event.preventDefault()
          const state_name = this.state_name.value
          const state_add = this.state_add.value
          this.props.register_state(state_name, state_add)

        }}>

          <div className="form-group mr-sm-2">
            <input
              id="state_name"
              type="text"
              ref={(input) => { this.state_name = input }}
              className="form-control"
              placeholder="State Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="state_add"
              type="text"
              ref={(input) => { this.state_add = input }}
              className="form-control"
              placeholder="State Account address"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Register State</button>
        </form>
        <p>&nbsp;</p>

        

        <h1>update state</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const state_id = this.state_id.value
          const new_order = this.new_order.value
          this.props.update_state(state_id,new_order)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="state_id"
              type="text"
              ref={(input) => { this.state_id = input }}
              className="form-control"
              placeholder="state_id"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="new_order"
              type="text"
              ref={(input) => { this.new_order = input }}
              className="form-control"
              placeholder="new_order"
              required />
          </div>
          <button type="submit" className="btn btn-primary">update</button>
        </form>
        <p>&nbsp;</p>

        
        <h1>States</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name </th>
              <th scope="col">Address </th>
              <th scope="col">Allocation </th>
            </tr>
          </thead>
          <tbody id="states details">
            { this.props.states.map((state, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{state.id.toString()}</th>
                  <td>{state.name.toString()}</td>
                  <td>{state.state_add.toString()}</td>
                  <td>{state.allocation.toString()}</td>
                </tr>  
              )
            })}
          </tbody>
        </table>


        <h1>Register Company</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const period = this.period.value
          const temp_min = this.temp_min.value
          const temp_max = this.temp_max.value
          const name = this.name.value
          const company_add = this.company_add.value
          this.props.register_company(period,temp_min,temp_max,name,company_add)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="name"
              type="text"
              ref={(input) => { this.name = input }}
              className="form-control"
              placeholder="Company name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="company_address"
              type="text"
              ref={(input) => { this.company_add = input }}
              className="form-control"
              placeholder="Company address"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="Expire"
              type="text"
              ref={(input) => { this.period = input }}
              className="form-control"
              placeholder="Expire duration"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="minimum_temp"
              type="text"
              ref={(input) => { this.temp_min = input }}
              className="form-control"
              placeholder="Minimum temperature"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="maximum_temp"
              type="text"
              ref={(input) => { this.temp_max = input }}
              className="form-control"
              placeholder="Maximum temperature"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <p>&nbsp;</p>

        <h1>Vaccine Registration</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const company_id = this.company_id.value
          const batch = this.batch.value
          const time = this.time.value
          const cur_temp = this.cur_temp.value
          this.props.vaccine_registration(company_id,batch,time,cur_temp)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="C_id"
              type="text"
              ref={(input) => { this.company_id = input }}
              className="form-control"
              placeholder="Company ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="Batch"
              type="text"
              ref={(input) => { this.batch = input }}
              className="form-control"
              placeholder="Batch"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="Manufacture Time"
              type="text"
              ref={(input) => { this.time = input }}
              className="form-control"
              placeholder="Manufacture time"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="current_temperature"
              type="text"
              ref={(input) => { this.cur_temp = input }}
              className="form-control"
              placeholder="Vaccine temperature"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
        <p>&nbsp;</p>

        <h1>Place Order</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const company_id = this.company_id.value
          const newOrder = this.newOrder.value
          this.props.place_order(company_id,newOrder)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="C_id"
              type="text"
              ref={(input) => { this.company_id = input }}
              className="form-control"
              placeholder="Company ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="order"
              type="text"
              ref={(input) => { this.newOrder = input }}
              className="form-control"
              placeholder="Quantity"
              required />
          </div>
         
          <button type="submit" className="btn btn-primary">Order</button>
        </form>
        <p>&nbsp;</p>

        <h1>Vaccine Companies</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">name</th>
              <th scope="col">Company Id </th>
              <th scope="col">Expering period </th>
              <th scope="col">Minimum temperature </th>
              <th scope="col">Maximum temperature </th>
              <th scope="col">Company Add </th>

            </tr>
          </thead>
          <tbody id="states details">
            { this.props.company.map((state, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{state.name.toString()}</th>
                  <td>{state.company_id.toString()}</td>
                  <td>{state.valid_days.toString()}</td>
                  <td>{state.temp_min.toString()}</td>
                  <td>{state.temp_max.toString()}</td>
                  <td>{state.company_add.toString()}</td>
                </tr>  
              )
            })}
          </tbody>
        </table>




        
      </div>
    );
  }
}

export default Main;
