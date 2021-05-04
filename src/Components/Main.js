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
        
      </div>
    );
  }
}

export default Main;
