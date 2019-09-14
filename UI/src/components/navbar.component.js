import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Library</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Orders</Link>
            </li>
            <li className="navbar-item">
              <Link to="/createorder" className="nav-link">Create Order</Link>
            </li>
            <li className="navbar-item">
              <Link to="/book" className="nav-link">Books</Link>
            </li>
            <li className="navbar-item">
              <Link to="/createbook" className="nav-link">Create Book</Link>
            </li>
            <li className="navbar-item">
              <Link to="/customer" className="nav-link">Customers</Link>
            </li>
            <li className="navbar-item">
              <Link to="/createcustomer" className="nav-link">Create Customer</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}