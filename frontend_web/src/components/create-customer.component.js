import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCustomer extends Component {
  constructor(props) {
    super(props);

    this.onChangeCustomername = this.onChangeCustomername.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customername: '',
      age: '',
      address: ''
    }
  }

  onChangeCustomername(e) {
    this.setState({
      customername: e.target.value
    })
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    })
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const customer = {
      name: this.state.customername,
      age: this.state.age,
      address: this.state.address
    }

    console.log(customer);

    axios.post('http://localhost:5555/customer/', customer)
      .then(res => console.log(res.data));

    this.setState({
      customername: '',
      age: '',
      address: ''
    })
    window.location = '/customer';
  }

  render() {
    return (
      <div>
        <h3>Create New Customer</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Customername: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.customername}
              onChange={this.onChangeCustomername}
            />
          </div>
          <div className="form-group">
            <label>Age: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Customer" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}