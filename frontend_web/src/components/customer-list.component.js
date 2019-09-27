import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Customer = props => (
  <tr>
    <td>{props.customer.name}</td>
    <td>{props.customer.age}</td>
    <td>{props.customer.address}</td>
    <td>
      <Link to={"/editcustomer/" + props.customer._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCustomer(props.customer._id) }}>delete</a>
    </td>
  </tr>
)

export default class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.deleteCustomer = this.deleteCustomer.bind(this)

    this.state = { customers: [] };
  }

  componentDidMount() {
    axios.get(process.env.CUSTOMERSERVICE + '/customers/')
      .then(response => {
        this.setState({ customers: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCustomer(id) {
    axios.delete(process.env.CUSTOMERSERVICE + '/customer/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      customers: this.state.customers.filter(el => el._id !== id)
    })
  }

  customerList() {
    return this.state.customers.map(currentcustomer => {
      return <Customer customer={currentcustomer} deleteCustomer={this.deleteCustomer} key={currentcustomer._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Customers</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Customer</th>
              <th>Age</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.customerList()}
          </tbody>
        </table>
      </div>
    )
  }
}